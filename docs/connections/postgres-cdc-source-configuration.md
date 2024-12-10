---
title: PostgreSQL CDC Reader Configuration
description: PostgreSQL CDC Reader Configuration Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

:::warning Important Note
This configuration is only required for CDC (Change Data Capture) mode. If you plan to read data in conversion mode, skip this specific configuration. Configuration settings related to reading data from PostgreSQL WALs are not necessary when operating in conversion mode.
:::

## Overview

DBConvert Streams can ingest data from PostgreSQL using Write-Ahead Logs (WALs). By analyzing the WALs, the platform captures the changes made to the database, including INSERT, UPDATE, and DELETE operations.

DBS PostgreSQL Reader uses [Logical Replication](https://www.postgresql.org/docs/10/logical-replication.html) that was introduced in PostgreSQL 10 to capture changes in a Postgres database. Data change events consumed from the logical decoding stream are then sent to the DBConvert Event Hub.

## Prerequisites

PostgreSQL Reader supports the following databases:
- PostgreSQL 10 and higher
- Greenplum Database
- YugabyteDB
- EDB Postgres
- Citus
- CockroachDB

## Cloud Provider Configuration Guides

For cloud-hosted PostgreSQL databases, refer to these specific configuration guides:

- [Azure Database for PostgreSQL Configuration](./azure-database-configuration)
- [Google Cloud SQL PostgreSQL Configuration](./google-cloud-sql)
- [Amazon RDS PostgreSQL Configuration](./amazon-rds)
- [AWS Aurora PostgreSQL Configuration](./aws-aurora-postgres)
- [DigitalOcean CDC Setup Guide](./do-database-cdc)

## PostgreSQL CDC Server Configuration

To set up logical replication, enable WAL on the self-hosted (generic) PostgreSQL server:

### PostgreSQL Configuration File Settings

Modify the PostgreSQL configuration file `postgresql.conf`, usually found in the `/etc/postgresql/<version>/main/` folder on Linux:

```ini
wal_level = logical
max_replication_slots = 5
max_wal_senders = 10
```

| Parameter             | Value   | Description                                                                                                            |
| --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| wal_level             | logical | Required to record information needed for log-based replication                                                       |
| max_replication_slots | 5       | Should be equal to or higher than the number of PostgreSQL connectors that use WAL plus other replication slots      |
| max_wal_senders       | 10      | Should be at least twice the number of logical replication slots                                                     |

## Whitelist DBConvert Streams' IP Addresses

You must whitelist the IP address of the DBS source server to allow connection to the Postgres server from DBConvert Streams.

In the `postgresql.conf` file, add DBConvert Streams IP addresses or `*` for the `listen_addresses` parameter to allow connections from all IP addresses.

### PostgreSQL Database Configuration File

`pg_hba.conf` is the PostgreSQL client authentication configuration file, usually located at `/etc/postgresql/<version>/main/`. This file defines which hosts can connect as authenticated clients, which PostgreSQL usernames they can use, and which databases they can access.

Edit `pg_hba.conf` and add the following records, replacing `<IP address>` with the DBS Source Server IP address. `<user>` can be `all`, or an existing username:

```
local   replication     <user>            <IP address>/0          trust
```

Example:
```
host    replication     all             127.0.0.1/0            trust
```

Make sure you have DBConvert Streams IPs or 0.0.0.0 to allow all IPs to connect:
```
host         all      <user>              0.0.0.0/0            md5
```

:::warning Note
If you have a multi-node cluster, add an entry for each DBS PostgreSQL Reader.
:::

## Enable Access to WALs

Once you have completed the above steps:

1. Restart PostgreSQL for the changes to take effect

2. Grant access to WALs to the database user:
```sql
ALTER ROLE <user> WITH REPLICATION;
ALTER ROLE <user> WITH LOGIN;
```

:::info Note
Remember to replace `<user>` with the intended username.
:::

For more information about logical replication in PostgreSQL, please refer to the [PostgreSQL Change Data Capture (CDC)](https://dbconvert.com/blog/postgresql-change-data-capture-cdc/) article.