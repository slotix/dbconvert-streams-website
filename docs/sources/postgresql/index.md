---
title: DBConvert-stream - Usage
description: Counter
layout: doc
lastUpdated: true
---

## PostgreSQL configuration

Receive database events from PostgreSQL using logical replication protocol and transform them into a common event format.


### Custom config file.

Sample config file is provided by PostgreSQL which is available in the container at `/usr/share/postgresql/postgresql.conf.sample` (`/usr/local/share/postgresql/postgresql.conf.sample` in Alpine variants).

```
docker run -i --rm postgres:14.1-alpine cat /usr/local/share/postgresql/postgresql.conf.sample > postgres.conf
```

### postgresql.conf settings.

In `postgresql.conf` you need to set `wal_level = logical` to make logical replication possible. 
`max_wal_senders` and `max_replication_slots` must be at least 1 or higher if your server may be using more replication connections.

Change the following settings in your postgresql.conf:
```
wal_level=logical
max_wal_senders=10
max_replication_slots=10
```

### Clean old WAL files.

```
pg_archivecleanup -d pg_wal 000000010000000A0000006B
```

Check list of slots:
```
SELECT slot_name, plugin, slot_type, database, active, restart_lsn, confirmed_flush_lsn FROM pg_replication_slots;
```

destroy a slot you no longer need to stop it consuming
```
SELECT pg_drop_replication_slot('replication_slot');
```


### pgAdmin

pgAdmin runs as the pgadmin user (UID: 5050) in the pgadmin group (GID: 5050) in the container. You must ensure that all files are readable, and where necessary (e.g. the working/session directory) writeable for this user on the host machine. For example:

sudo chown -R 5050:5050 <host_directory>

More info is available at https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#mapped-files-and-directories





Create a publication in PostgreSQL like this: 
```
CREATE PUBLICATION CDC FOR ALL TABLES;
```

This will include in the publication all existing tables and also the ones that will be created in future. If you want only a subset of tables to be replicated - list them specifically. 

See [PostgreSQL documentation](https://www.postgresql.org/docs/10/sql-createpublication.html) for details.

## FAQ

### Russian translation of the article about PostgreSQL replication.
https://habr.com/ru/company/first/blog/668516/

### What data is captured by logical encoding?

Logical decoding can only output information about DML (data manipulation) events in Postgres, that is INSERT, UPDATE, and DELETE. DDL (data definition) changes like CREATE TABLE, ALTER ROLE, and DROP INDEX are not emitted by logical decoding. 

### Logical encoding is applicable at small loads. When we are talking about 2 or more WALs per second, there may already be problems with the replication lag.

https://gitlab.com/postgres-ai/postgresql-consulting/tests-and-benchmarks/-/issues/32


## PostgreSQL Libraries

https://github.com/lib/pq is currently in maintenance mode.
So we have to use **pgx** https://github.com/jackc/pgx which is under active development.


## Stuff

Connect to database

```
psql -h localhost -p 5432 -U postgres postgres
```

switch to pgorepl db

`postgres=# \c pgorepl`

To eliminate such errors 

```
ERROR:  cannot delete from table "t" because it does not have a replica identity and publishes deletes
HINT:  To enable deleting from the table, set REPLICA IDENTITY using ALTER TABLE.
```

`pglogrepl=# ALTER TABLE t REPLICA IDENTITY FULL;`


### List replication slots 

```
SELECT
  slot_name,
  plugin,
  slot_type,
  datoid,
  database,
  temporary,
  active,
  active_pid,
  xmin,
  catalog_xmin,
  restart_lsn,
  confirmed_flush_lsn
FROM pg_replication_slots
```

### Replication slots name

Each replication slot has a name, which can contain lower-case letters, numbers, and the underscore character.
It's name cannot contain something like "-".
https://www.postgresql.org/docs/10/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION



## Using pg_dump for getting Create table DDL

How to get "create table" statements from postgres?
There is no MySQL equivalent of a command like "SHOW CREATE TABLE table"
So there is a way to use the pg_dump utility for this.

```
pg_dump -t 'public.t' --schema-only postgres -h '127.0.0.1' -U 'postgres'                                        

Password: 
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: t; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t (
    id integer,
    name text
);


ALTER TABLE public.t OWNER TO postgres;

--
-- PostgreSQL database dump complete
--
```


### How to generate create table statements in postgresql

Please use below query to get create table statement, please pass the table name in where clause

```
select 'CREATE TABLE ' || a.attrelid::regclass::text || '(' ||
string_agg(a.attname || ' ' || pg_catalog.format_type(a.atttypid,
a.atttypmod)||
    CASE WHEN
        (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)
         FROM pg_catalog.pg_attrdef d
         WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef) IS NOT 
NULL THEN
        ' DEFAULT '|| (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)
                      FROM pg_catalog.pg_attrdef d
                      WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef)
    ELSE
        '' END
||
    CASE WHEN a.attnotnull = true THEN
        ' NOT NULL'
    ELSE
        '' END,E'\n,') || ');'
FROM pg_catalog.pg_attribute a join pg_class on a.attrelid=pg_class.oid
WHERE a.attrelid::regclass::varchar =
'table_name'
AND a.attnum > 0 AND NOT a.attisdropped  and pg_class.relkind='r'
group by a.attrelid;
```


## Testing 

### Create tables

```
-- Table: public.products1

-- DROP TABLE IF EXISTS public.products1;

CREATE TABLE IF NOT EXISTS public.products1
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    price numeric(12,2) NOT NULL,
    weight double precision NOT NULL,
    created timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products1_pkey PRIMARY KEY (id)
)
```


### Test INSERT, UPDATE, DELETE Operations

```
TRUNCATE products;
TRUNCATE products1;
INSERT Into products (id, price, name, weight) VALUES 
(1, 0.63,'Prod1', 312),
(2, 3.9, 'Prod2',332), 
(3, 0.02, 'Prod3',452) ;
INSERT Into products1 (id, price, name, weight) VALUES 
(1, 0.63,'Prod1', 312),
(2, 3.9, 'Prod2',332), 
(3, 0.02, 'Prod3',452) ;
INSERT Into products (id,price,name,weight) VALUES 
(4, 0.69, 'Bread',200), 
(5, 2.59, 'Butter',199), 
(6, 1.09, 'Fanta',322) ;
INSERT Into products1 (id,price,name,weight) VALUES 
(4,0.69, 'Bread',200), 
(5, 2.59, 'Butter',199), 
(6, 1.09, 'Fanta',322) ;
UPDATE products SET name='Coca-Cola' WHERE id=6;
UPDATE products1 SET name='Coca-Cola' WHERE id=6;
DELETE FROM products WHERE id in (4,5);
DELETE FROM products1 WHERE id in (4,5);
```


### Bulk insert

```
TRUNCATE t;
INSERT INTO t(id, name) 
	SELECT g.id, k.name FROM generate_series(1, 100001) as g(id), 
	substr(md5(random()::text), 0, 25) as k(name);
```


## Create Stream

```bash
curl --request POST --url http://127.0.0.1:8020/ -H 'Content-Type: application/json' -d '{
   "source":{
      "type":"postgresql",
      "connection":{
         "host":"localhost",
         "port":5432,
         "user":"postgres",
         "password":"postgres",
         "database":"postgres", 
         "SSLMode":"disable"
      },
      "settings":{
         "replicationSlotName":"myslot_1",
         "publicationName":"dbconvert-publication"
      },
      "initialLoad":false,
      "filter":{
         "tables":{
            "products1":[
               "insert",
               "update",
               "delete"
            ],
            "products2":[
               "insert",
               "update",
               "delete"
            ]
         }
      }
   },
   "destination":{
      "type":"postgresql",
      "connection":{
         "host":"localhost",
         "port":5432,
         "user":"postgres",
         "password":"postgres",
         "database":"destination",
         "SSLMode":"disable"
      },
      "initialLoad":false,
      "filter":{
         "tables":{
            "products1":[
               "insert",
               "update",
               "delete"
            ],
            "products2":[
               "insert",
               "update",
               "delete"
            ]
         }
      }
   },
   "limits":{
      "records":100000,
      "time":0
   }
}'
```