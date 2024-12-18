---
title: MySQL CDC Reader Configuration
description: MySQL CDC Reader Configuration Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# MySQL CDC Reader Configuration

:::warning Important Note
This configuration is only required for CDC (Change Data Capture) mode. If you plan to read data in conversion mode, skip this specific configuration. Configuration settings related to reading data from MySQL Binary Logs are not necessary when operating in conversion mode.
:::

## Overview

In MySQL, every change made to the database is carefully recorded in MySQL Binary Logs (Binlogs). These logs track what's happening inside the database, including data updates, table creation, and other actions.

DBConvert Streams can utilize MySQL Binary Logs to extract data changes from the database, enabling capture of row-level events and ensuring efficient data ingestion. By reading and analyzing the Binary Logs, DBConvert Streams can detect `INSERT`, `UPDATE`, and `DELETE` operations.

## Prerequisites

DBS MySQL reader supports the following database types:
- MySQL versions 8.0 and later
- MariaDB
- Percona
- SingleStore DB (formerly MemSQL)
- TiDB
- Vitess

## Cloud Provider Configuration Guides

For cloud-hosted MySQL databases, refer to these specific configuration guides:

- [Azure Database for MySQL Configuration](./azure-database-configuration)
- [Google Cloud SQL MySQL Configuration](./google-cloud-sql)
- [Amazon RDS MySQL Configuration](./amazon-rds)
- [AWS Aurora MySQL Configuration](./aws-aurora-mysql)
- [DigitalOcean CDC Setup Guide](./do-database-cdc)


## MySQL Server Configuration for CDC Mode

### How to Check if Binlog Replication is Enabled

Send the following SQL statement to the database to check if Binlog replication is already enabled:

```sql
SELECT @@log_bin;
```

### Understanding the Results
- `1`: Binary logging is active and properly configured
- `0`: Binary logging is currently disabled

For a more detailed view of your binary log configuration:

```sql
-- Check binary log format
SHOW VARIABLES LIKE 'binlog_format';

-- View binary log status
SHOW MASTER STATUS;

-- List existing binary logs
SHOW BINARY LOGS;
```

### Enable Binlog Replication

If binary logging is disabled (returns `0`), follow these steps:

1. Make sure the following options are specified in the MySQL configuration file:

```ini
[mysqld]
server_id        = 1
log_bin          = mysql-bin
binlog_format    = row
binlog_row_image = full
```

| Parameter        | Value     | Description                                                                       |
| ---------------- | --------- | --------------------------------------------------------------------------------- |
| binlog_format    | row       | This parameter enables Binlog replication to receive insert, update and delete row events |
| binlog-row-image | full      | Should be `full` for MySQL; you may lose some field data if you update PK data in MySQL with `minimal` or `noblob` binlog-row-image. MariaDB only supports the `full` value |
| log_bin          | mysql-bin | For Ubuntu, use: `/var/log/mysql/mysql-bin.log`                                  |

2. Restart the MySQL server for changes to take effect
3. Verify the configuration using the check commands above

## Whitelist DBConvert Streams' IP Addresses

To allow connection to the MySQL server from DBConvert Streams, you must whitelist the IP address of the DBS source server.

In MySQL configuration file in the `[mysqld]` section add:

```ini
bind-address = 0.0.0.0
```

Or add the following string, replacing `<IP address>` with the actual IP address of the DBS source server:

```ini
bind-address = <IP address>
```

::: note
If you have a multi-node cluster, add an entry for each DBConvert Streams source server that will run MySQL CDC Reader.
:::

### Grant Privileges to the User

Once you have completed the above steps:

1. Restart MySQL server for the changes to take effect

2. The database user specified in the Stream Source connection must have the following global privileges:
   - SELECT
   - SUPER or (REPLICATION_CLIENT and REPLICATION_SLAVE)

3. Grant access to Binary logs to the database user:

```sql
GRANT SELECT ON *.* to `mysql_user`@`%`;
```

You can check the current grants for a user with:

```sql
SHOW GRANTS FOR `mysql_user`@`%`;
```

For more information on all available replication options and binary logs, see the [Replication Reference Guide](https://dev.mysql.com/doc/refman/8.0/en/replication-options.html) on the MySQL Documentation Portal.