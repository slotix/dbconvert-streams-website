---
title: PostgreSQL CDC Reader configuration.
description: Using PostgreSQL CDC. Server config. Postgres reader properties.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}


![Transaction Log Change Data Capture](/images/postgresql/postgresql-cdc.png)

DBConvert Stream supports data ingestion from PostgreSQL via Write Ahead Logs (WALs). 

A WAL is a collection of log files that record information about data modifications and data object modifications made on a PostgreSQL server instance.

PostgreSQL Reader uses [Logical Replication](https://www.postgresql.org/docs/10/logical-replication.html) that was introduced in PostgreSQL 10 to capture changes in a Postgres database.

Incoming INSERT, UPDATE and DELETE events from WAL transaction logs are decoded with standard logic decoding plugin `pgoutput` which is shipped with PostgreSQL natively.

Data change Events consumed from [logical decoding stream](https://www.postgresql.org/docs/current/protocol-replication.html) are then sent to the DBConvert Event Hub.

Read article [PostgreSQL Change data capture (CDC)](https://dbconvert.com/blog/postgresql-change-data-capture-cdc/) in our blog for deeper understanding of Postgres CDC.

### Supported Databases.
PostgreSQL Reader supports the following databases:
- PostgreSQL 10 and higher. 
- CockroachDB


## PostgreSQL server configuration.

To configure logical replication, enable WAL on the self-hosted (generic) PostgreSQL server:

### postgresql.conf settings.

Modify the PostgreSQL configuration file `postgresql.conf`, generally found in `/etc/postgresql/\<version\>/main/` folder in the Linux.

``` ini
wal_level=logical
max_replication_slots=5
max_wal_senders=10
wal_sender_timeout=0
```

| Parameter             | Value   | Description                                                                                                                                                                                                                                                               |
|-----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| wal_level             | logical | The `logical` is required to record information needed for log-based replication.                                                                                                                                                                                           |
| max_replication_slots | 5       | `max_replication_slots` value should be equal to or higher than the number of PostgreSQL connectors that use WAL plus the number of other replication slots your database uses.                                                                                             |
| max_wal_senders       | 10      | `max_wal_senders` parameter specifies the maximum number of concurrent connections to the WAL, is at least twice the number of logical replication slots. For example, if your database uses 5 replication slots in total, the `max_wal_senders` value must be 10 or greater. |
| wal_sender_timeout    | 0       | The time, in seconds, after which PostgreSQL terminates the replication connections due to inactivity. Default value: 60 seconds. You must set the value to 0 so that the connections are never terminated and your Stream does not fail.                                 |


You have to whitelist _DBConvert Stream Source Server IP address_ to enable connecting to Postgres server from DBConvert Stream.

In the `postgresql.conf` file, add the _DBConvert Stream IP addresses_ or `*` for the `listen_addresses` parameter to allow all IPs to connect.


### PostgreSQL database configuration file.

`pg_hba.conf` is PostgreSQL Client Authentication Configuration File.
This file is generally found in the path: `/etc/postgresql/<version>/main/`
A short synopsis from the real pg_hba.conf follows


> This file controls: which hosts are allowed to connect, how clients
are authenticated, which PostgreSQL user names they can use, which
databases they can access.

Edit `pg_hba.conf` and add the following records, replacing `<IP address>` with the `DBConvert Stream Source Server IP address`. \<user\> can be `all`, or an existing user name.

```
local   replication     <user>            <IP address>/0          trust
```

Example: 
```
host    replication     all             127.0.0.1/0            trust
```

Ensure that you have _DBConvert Stream IP addresses_ or 0.0.0.0 to allow all IPs to connect.


```
host         all      <user>              0.0.0.0/0            md5
```

If you have a multi-node cluster, add a record for each DBConvert Stream Source Server that will run PostgreSQL Reader.


### Enable access to WALs

Once you have successfully completed the steps above, do the following:
1. Restart PostgreSQL to take effect.
2. Provide access to WAL for the database user:

``` SQL
alter role <user> with replication;
alter role <user> with login;
```

**Note:** Remember to replace \<user\> with your intended user.


## PostgreSQL reader properties.

Before using this adapter, PostgreSQL Server must be configured as described above.

PostgreSQL reader sample configuration with each property description follows below:

```JSON
"source": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/postgres?sslmode=verify-ca&sslrootcert=../../config/postgresql/certs/ca.crt&sslkey=../../config/postgresql/certs/client.key&sslcert=../../config/postgresql/certs/client.crt",
    "settings": {
      "replicationSlotName": "dbconvert_replication_slot",
      "publicationName": "dbconvert_publication"
    },
    "filter": {
      "tables": [
        { "name": "private.products1", "operations": ["insert", "update", "delete"]},
        { "name": "products2", "operations": ["insert", "update", "delete"]}
      ]
    }
  }
```

General config options like *type* and *filter/tables* are described in [Source Configuration](/sources/source-config).

### Multiple schemas support for PostgeSQL.

**Note:** _Public schema_ is is meant by default when there is no other schema specified in the configuration. So in the example above `products2` is equivalent to `public.products2` Names are case-sensitive. 

Specify source table names as `<schema>.<table>` to return changed data from a table located in other than _Public_ schema.

## PostgreSQL specific options.


### Connection parameter.

Parameter *connection* is used to establish the connection to PostgreSQL server.

```
# Example DSN
user=postgres password=passw0rd host=postgres.host.com port=5432 dbname=mydb

# Example URL
postgres://postgres:passw0rd@postgres.host.com:5432/mydb
```

Connection may either be in *URL format* or *keyword = value format (DSN style)*. See https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING for details. 

If connection is empty the source reader will try to read connection parameters from the environment. If a password is not supplied it will attempt to read the `.pgpass` file.


The following environment variables are currently recognizes and their parameter key word equivalents passed via database URL or DSN:

```
PGHOST
PGPORT
PGDATABASE
PGUSER
PGPASSWORD
PGPASSFILE
PGSERVICE
PGSERVICEFILE
PGSSLMODE
PGSSLCERT
PGSSLKEY
PGSSLROOTCERT
PGSSLPASSWORD
PGAPPNAME
PGCONNECT_TIMEOUT
PGTARGETSESSIONATTRS
```

See http://www.postgresql.org/docs/11/static/libpq-envars.html for details on the meaning of environment variables.

See https://www.postgresql.org/docs/11/libpq-connect.html#LIBPQ-PARAMKEYWORDS for parameter key word names. They are usually but not always the environment variable name downcased and without the "PG" prefix.

### TLS/SSL Connection settings.

To enable SSL encrypted connection specify SSL parameters in the connection string like so:

```
# Example DSN
user=postgres password=passw0rd host=postgres.host.com port=5432 dbname=mydb sslmode=verify-ca sslrootcert=/path_to/ca.crt sslkey=/path_to/client.key sslcert=/path_to/client.crt

# Example URL
postgres://postgres:passw0rd@postgres.host.com:5432/mydb?sslmode=verify-ca&sslrootcert=/path_to/ca.crt&sslkey=/path_to/client.key&sslcert=/path_to/client.crt
```



### Other PostgreSQL params. (optional)

By default you don't need to specify `replicationSlotName` and `publicationName` parameters explicitely. They are created automatically when the Postgres reader starts. However if you want to customize names of [Replication Slot](https://www.postgresql.org/docs/14/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION) name and [Publication Name](https://www.postgresql.org/docs/14/sql-createpublication.html) add corresponded parameters to the source configuration. 

| property       | type | default value| description                                                                                            |
|------|----------|------|------|
|replicationSlotName| string | `dbconvert_replication_slot`|The name of the replication slot to create. Replication slot make PostgreSQL CDC available.|
|publicationName |string |`dbconvert-publication` |A publication is essentially a group of tables whose data changes are intended to be replicated through logical replication. 