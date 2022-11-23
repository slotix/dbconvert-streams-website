---
title: PostgreSQL CDC Reader configuration.
description: Using PostgreSQL CDC. Server config. Postgres reader properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

![Transaction Log Change Data Capture](/images/postgresql/postgresql-cdc.png)

DBConvert Streams platform ingests data from a PostgreSQL database via Write Ahead Logs (WALs) that collect data about changes made to a PostgreSQL server.

DBS PostgreSQL Reader uses [Logical Replication](https://www.postgresql.org/docs/10/logical-replication.html) that was introduced in PostgreSQL 10 to capture changes in a Postgres database.

Incoming `INSERT`, `UPDATE`, and `DELETE` events from WAL transaction logs are decoded using the standard logic decoding plugin `pgoutput`, which is shipped with PostgreSQL natively.

Data change Events consumed from [logical decoding stream](https://www.postgresql.org/docs/current/protocol-replication.html) are then sent to the DBConvert Event Hub.

Please read the [PostgreSQL Change Data Capture (CDC)](https://dbconvert.com/blog/postgresql-change-data-capture-cdc/) article on our blog for a deeper understanding of Postgres CDC.

### Supported Databases.

PostgreSQL Reader supports the following databases:

- PostgreSQL 10 and higher.
- CockroachDB

## PostgreSQL server configuration.

To set up logical replication, enable WAL on the self-hosted (generic) PostgreSQL server :

### postgresql.conf settings.

Modify the PostgreSQL configuration file `postgresql.conf`, usually found in the `/etc/postgresql/\<version\>/main/` folder on Linux.

```ini
wal_level=logical
max_replication_slots=5
max_wal_senders=10
wal_sender_timeout=0
```

| Parameter             | Value   | Description                                                                                                                                                                                                                                                                |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wal_level             | logical | The `logical` is required to record information required for log-based replication.                                                                                                                                                                                        |
| max_replication_slots | 5       | `max_replication_slots` value should be equal to or higher than the number of PostgreSQL connectors that use WAL plus the number of other replication slots your database uses.                                                                                            |
| max_wal_senders       | 10      | `max_wal_senders` parameter specifies the maximum number of concurrent connections to the WAL, which is at least twice the number of logical replication slots. For example, if your database uses 5 replication slots, the `max_wal_senders` value must be 10 or greater. |
| wal_sender_timeout    | 0       | Time in seconds, after which PostgreSQL terminates replication connections due to inactivity. Default value: 60 seconds. You should set the value to 0, so connections are never dropped, and a stream runs indefinitely.                                                  |

You must whitelist the IP address of the _DBS source server_ to allow connection to the Postgres server from DBConvert Streams.

In the `postgresql.conf` file, add _DBConvert Streams IP addresses_ or `*` for the `listen_addresses` parameter to allow connections from all IP addresses.

### PostgreSQL database configuration file.

`pg_hba.conf` is the PostgreSQL client authentication configuration file.
This file is usually located along the path: `/etc/postgresql/\<version\>/main/`
A short synopsis of the actual `pg_hba.conf` file follows.

> This file defines: which hosts can connect as authenticated clients, which PostgreSQL usernames they can use, which
> databases they can access.

Edit `pg_hba.conf` and add the following records, replacing `<IP address>` with the `DBS Source Server IP address. \<user\> can be `all`, or an existing user name.

```
local   replication     <user>            <IP address>/0          trust
```

Example:

```
host    replication     all             127.0.0.1/0            trust
```

Make sure you have _DBConvert Streams IPs_ or 0.0.0.0 to allow all IPs to connect.

```
host         all      <user>              0.0.0.0/0            md5
```

If you have a multi-node cluster, add an entry for each DBS PostgreSQL Reader.

### Enable access to WALs

Once you have completed the above steps, do the following:

1. Restart PostgreSQL for the changes to take effect.
2. Grant access to WALs to the database user:

```SQL
alter role <user> with replication;
alter role <user> with login;
```

**Note:** Remember to replace \<user\> with the intended user.

## PostgreSQL reader properties.

Before using this adapter, PostgreSQL Server must be configured as described above.

An example PostgreSQL reader configuration with a description of each property is shown below:

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

General configuration options such as _type_ and _filter/tables_ are described in [Source Configuration](/sources/source-config).

### Multiple schemas support for PostgeSQL.

**Note** _Public Schema_ is used by default unless another schema is specified in the configuration. Thus, in the example above, `products2` is equivalent to `public.products2`. Names are case-sensitive.

Specify source table names as `<schema>.<table>` to return changed data from a table that is in other than _Public_ schema.

## PostgreSQL-specific options.

### Connection parameter.

The _connection_ parameter sets up a connection to a PostgreSQL server.

```
# Example DSN
user=postgres password=passw0rd host=postgres.host.com port=5432 dbname=mydb
```

```
# Example URL
postgres://postgres:passw0rd@postgres.host.com:5432/mydb
```

The connection can be in _URL format_ or _keyword = value format (DSN style)_. See https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING for details.

If the connection is empty, PostgreSQL Reader will try to read the connection parameters from the environment. If no password is specified, it will try to read the `.pgpass` file.

The following environment variables are currently recognized, and their parameter equivalents are passed through the database URL or DSN:

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

See https://www.postgresql.org/docs/11/libpq-connect.html#LIBPQ-PARAMKEYWORDS for parameter names. They are usually but not always the environment variable name downcased and without the "PG" prefix.

See https://www.postgresql.org/docs/11/libpq-connect.html#LIBPQ-PARAMKEYWORDS for parameter names. This is usually, but not always, the environment variable's name in lowercase and without the "PG" prefix.

### TLS/SSL Connection settings.

To enable an SSL encrypted connection, specify the SSL options in the connection string as follows:

```
# Example DSN
user=postgres password=passw0rd host=postgres.host.com port=5432 dbname=mydb sslmode=verify-ca sslrootcert=/path_to/ca.crt sslkey=/path_to/client.key sslcert=/path_to/client.crt

# Example URL
postgres://postgres:passw0rd@postgres.host.com:5432/mydb?sslmode=verify-ca&sslrootcert=/path_to/ca.crt&sslkey=/path_to/client.key&sslcert=/path_to/client.crt
```

### Other PostgreSQL params. (optional)

By default, you do not need to explicitly specify the `replicationSlotName` and `publicationName` parameters. They are set up when you start the Postgres reader. However, if you want to customize the names [Replication Slot](https://www.postgresql.org/docs/14/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION) and [Publication Name](https://www.postgresql.org/docs/14/sql-createpublication.html) add the appropriate parameters to the source configuration.

| property            | type   | default value                | description                                                                                                  |
| ------------------- | ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| replicationSlotName | string | `dbconvert_replication_slot` | The name of the replication slot to create. The replication slot makes the PostgreSQL CDC available.         |
| publicationName     | string | `dbconvert-publication`      | A publication is a group of tables whose data changes are intended to be replicated via logical replication. |
