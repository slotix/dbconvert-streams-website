---
title: MySQL binlog Reader configuration.
description: Using MySQL as a source. On-premises MySQL Server binary log  configuration.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

In MySQL, every change made to the database is carefully recorded in something called MySQL Binary Logs (Binlogs). These logs track what's happening inside the database, like when data is updated, new tables are created, or other actions are taken. They also give us a peek at the specific commands that caused these changes.

The DBConvert Streams platform supports reading data from MySQL/ MariaDB databases. It offers two options for data collection, depending on the reader mode.

Firstly, it can utilize MySQL Binary Logs to extract data changes from the database. This approach enables capturing row-level events and ensures efficient and reliable data ingestion. By reading and analyzing the Binary Logs, DBConvert Streams can detect `INSERT`, `UPDATE`, and `DELETE` operations and process them accordingly.


DBS MySQL reader supports the following database types:

- MySQL versions 8.0 and later
- MariaDB
- Percona

## MySQL server configuration for reading binlog data in CDC mode.

:::info 
If you plan to read data in conversion mode, skip this specific configuration. Configuration settings related to reading data from MySQL Binary Logs or setting up CDC mode are not necessary when operating in conversion mode. 
:::

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

## Whitelist DBConvert Streams' IP Addresses

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


Alternatively, DBConvert Streams can directly read data from the MySQL/MariaDB database tables in ["conversion/ copy data" reader mode](/sources/conversion-mode). This method involves retrieving data records from the source tables without relying on the Binary Logs. It offers a straightforward way of accessing the data for further processing.
