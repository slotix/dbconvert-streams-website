---
title: PostgreSQL Reader configuration.
description: Using PostgreSQL as a source. Postgres reader properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The DBConvert Streams platform offers support for ingesting data from PostgreSQL databases. It provides two options for data ingestion, depending on the chosen reader mode.

## CDC reading mode
![Transaction Log Change Data Capture](/images/postgresql/postgresql-cdc.png)

In the first CDC mode, DBConvert Streams can ingest data from PostgreSQL using Write-Ahead Logs (WALs). By analyzing the WALs, the platform can capture the changes made to the database, including INSERT, UPDATE, and DELETE operations. This approach ensures accurate and comprehensive data ingestion by capturing row-level events directly from the database's transaction logs.

DBS PostgreSQL Reader uses [Logical Replication](https://www.postgresql.org/docs/10/logical-replication.html) that was introduced in PostgreSQL 10 to capture changes in a Postgres database.

Data change Events consumed from [logical decoding stream](https://www.postgresql.org/docs/current/protocol-replication.html) are then sent to the DBConvert Event Hub.

Please read the [PostgreSQL Change Data Capture (CDC)](https://dbconvert.com/blog/postgresql-change-data-capture-cdc/) article on our blog for a deeper understanding of Postgres CDC.

Incoming `INSERT`, `UPDATE`, and `DELETE` events from WAL transaction logs are decoded using the standard logic decoding plugin `pgoutput`, which is shipped with PostgreSQL natively.

## Conversion mode.
Alternatively, DBConvert Streams can read data directly from the tables in the PostgreSQL database. This method involves extracting data records from the source tables without relying on the WALs. It provides a more direct way of accessing the data for further processing.

Conversion mode is specifically designed for one-time data transfers, such as database migration or consolidation, where the focus is on moving the existing data from the source PostgreSQL database to the target database.
When operating in conversion mode with PostgreSQL, DBConvert Streams directly reads the data from the tables of the source database. It establishes a connection to the PostgreSQL database using the provided connection details, such as the host, port, username, password, and database name.

DBConvert Streams performs schema discovery to understand the structure of the tables and retrieves the data in chunks to optimize performance.

During the conversion process, DBConvert Streams handles data type conversions, ensuring that the data from PostgreSQL is appropriately transformed to match the target database's requirements. It maps the source and target schemas, accommodating differences in table structures, column names, or data types.


### Supported Databases.

PostgreSQL Reader supports the following databases:

- PostgreSQL 10 and higher.
- CockroachDB

## PostgreSQL CDC server configuration.


:::info 
If you plan to read data in conversion mode, skip this specific configuration. Configuration settings related to reading data from Postgres WALs or setting up CDC mode are not necessary when operating in conversion mode. 
:::

To set up logical replication, enable WAL on the self-hosted (generic) PostgreSQL server :

### postgresql.conf settings.

Modify the PostgreSQL configuration file `postgresql.conf`, usually found in the `/etc/postgresql/\<version\>/main/` folder on Linux.

```ini
wal_level=logical
max_replication_slots=5
max_wal_senders=10
```

| Parameter             | Value   | Description                                                                                                                                                                                                                                                                |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wal_level             | logical | The `logical` is required to record information required for log-based replication.                                                                                                                                                                                        |
| max_replication_slots | 5       | `max_replication_slots` value should be equal to or higher than the number of PostgreSQL connectors that use WAL plus the number of other replication slots your database uses.                                                                                            |
| max_wal_senders       | 10      | `max_wal_senders` parameter specifies the maximum number of concurrent connections to the WAL, which is at least twice the number of logical replication slots. For example, if your database uses 5 replication slots, the `max_wal_senders` value must be 10 or greater. |

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

## PostgreSQL CDC reader properties.

Before using this adapter, PostgreSQL Server must be configured as described above.

An example PostgreSQL reader configuration with a description of each property is shown below:

```JSON
"source": {
    "mode": "cdc",
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

## Example of source configuration for convert mode. 

```JSON
"source": {
    "mode": "convert",
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/postgres"
}
```
### Multiple schemas support for PostgeSQL.

**Note** _Public Schema_ is used by default unless another schema is specified in the configuration. Thus, in the example above, `products2` is equivalent to `public.products2`. Names are case-sensitive.

Specify source table names as `<schema>.<table>` to return changed data from a table that is in other than _Public_ schema.

## PostgreSQL-specific options.

### Connection string.

The _connection_ string sets up a connection to a PostgreSQL server.

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

See https://www.postgresql.org/docs/11/libpq-connect.html#LIBPQ-PARAMKEYWORDS for parameter names. This is usually, but not always, the environment variable's name in lowercase and without the "PG" prefix.

### Timeout parameters.

Both `pool_max_conn_idle_time` and `pool_max_conn_lifetime` can be used to manage the resources used by a connection pool and prevent connections from consuming resources for an extended period of time.

| Parameter               | Default Value | Description                                                                                            |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| pool_max_conn_idle_time | 30m           | The maximum amount of time that a connection in a connection pool can remain idle before it is closed. |
| pool_max_conn_lifetime  | 1h            | The duration after a connection is created when it will be automatically closed.                       |

It can be useful to adjust the `pool_max_conn_idle_time` and `pool_max_conn_lifetime` parameters in cases where the time between transactions is longer than 30 minutes, and you need to keep the connection alive for a longer period of time. For example, if you have a long-running process that only performs transactions every hour or so, you may need to increase these parameters to ensure that the connection remains open and available for use.

### TLS/SSL Connection settings.

To enable an SSL encrypted connection, specify the SSL options in the connection string as follows:

```
# Example DSN
user=postgres password=passw0rd host=postgres.host.com port=5432 dbname=mydb sslmode=verify-ca sslrootcert=/path_to/ca.crt sslkey=/path_to/client.key sslcert=/path_to/client.crt

# Example URL
postgres://postgres:passw0rd@postgres.host.com:5432/mydb?sslmode=verify-ca&sslrootcert=/path_to/ca.crt&sslkey=/path_to/client.key&sslcert=/path_to/client.crt
```

### PostgreSQL CDC source specific params. (optional)

By default, you do not need to explicitly specify the `replicationSlotName` and `publicationName` parameters. They are set up when you start the Postgres reader. However, if you want to customize the names [Replication Slot](https://www.postgresql.org/docs/14/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION) and [Publication Name](https://www.postgresql.org/docs/14/sql-createpublication.html) add the appropriate parameters to the source configuration.

| property            | type   | default value                | description                                                                                                  |
| ------------------- | ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| replicationSlotName | string | `dbconvert_replication_slot` | The name of the replication slot to create. The replication slot makes the PostgreSQL CDC available.         |
| publicationName     | string | `dbconvert-publication`      | A publication is a group of tables whose data changes are intended to be replicated via logical replication. |

