---
title: MySQL CDC Reader configuration.
description: Using MySQL CDC. On-premises MySQL Server configuration.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBConvert Streams platform supports ingesting data from MySQL/MariaDB via MySQL Binary Logs.

MySQL Binlogs stores information about data change events made on the MySQL server. Incoming `INSERT,` `UPDATE,` and `DELETE` events from binary logs are captured by MySQL Reader as soon as they occur. MySQL Reader then sends the consumed events to the DBS Event Hub.

DBS MySQL reader supports the following database types:

- MySQL versions 8.0 and later
- MariaDB
- Percona

## MySQL server configuration.

To enable MySQL Binary Log (Binlog) replication, you must configure the MySQL server.

### How to check if Binlog replication is enabled?

Send the following SQL statement to the database to check if Binlog replication is already enabled.

```sql
select @@log_bin;
```

If `1` is returned, BinLog is active. A return value of `0` means that BinLog is disabled. To enable it, follow these steps.

### Enable Binlog replication.

1. Make sure the following options are specified in the MySQL configuration file. If not, add them now.

```ini
[mysqld]
server_id        =  1
log_bin          =  mysql-bin
binlog_format    =  row
binlog_row_image =  full
```

| Parameter        | Value     | Description                                                                                                                                                                  |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| binlog_format    | row       | This parameter enables Binlog replication to receive insert, update and delete row events.                                                                                   |
| binlog-row-image | full      | Should be `full` for MySQL; you may lose some field data if you update PK data in MySQL with `minimal` or `noblob` binlog-row-image. MariaDB only supports the `full` value. |
| log_bin          | mysql-bin | For ubuntu, use: `/var/log/mysql/mysql-bin.log`                                                                                                                              |

2. Restart the MySQL server.
3. Check if Binlog replication is enabled

```sql
SELECT @@log_bin;
```

Verify that the return value is 1, indicating that Binlog replication is active.

For more information on all available replication options and binary logs, see the [Replication Reference Guide](https://dev.mysql.com/doc/refman/8.0/en/replication-options.html) on the MySQL Documentation Portal.

### Whitelist DBConvert Streams' IP Addresses

You must whitelist the IP address of the _DBS source server_ to allow connection to the MySQL server from DBConvert Streams.

In MySQL configuration file in the `[mysqld]` section add

```ini
bind-address = 0.0.0.0
```

Or add the following string, replacing `<IP address>` with an actual `IP address of the DBS source server.`

```ini
bind-address = <IP address>
```

If you have a multi-node cluster, add an entry for each DBConvert Streams source server that will run MySQL CDC Reader.

### Grant privileges to the user.

Once you have completed the above steps, do the following:

Restart MySQL server for the changes to take effect.

The database user specified in the Stream Source [connection](#connection) must have the following global privileges:

- SELECT
- SUPER or (REPLICATION_CLIENT and REPLICATION_SLAVE)

2. Grant access to Binlogs to the database user:

```SQL
GRANT SELECT ON *.* to `mysql_user`@`%`;
```

Optionally, you can check the current grants for a user with the following command:

```SQL
SHOW GRANTS FOR `mysql_user`@`%`;
```

Discover further details regarding the complete set of properties applicable to the MySQL Reader by visiting the following source: [MySQL Reader properties](/sources/mysql/reader-properties).

