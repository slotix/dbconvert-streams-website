---
title: MySQL CDC Reader configuration.
description: Using MySQL CDC. Server config. MySQL reader properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBConvert Stream supports ingesting data from MySQL/MariaDB via MySQL Binary Logs.

MySQL Binlogs stores information about data change events made on the MySQL server. Incoming `INSERT,` `UPDATE,` and `DELETE` events from binary logs are captured by MySQL Reader as soon as they occur. MySQL Reader then sends the consumed events to the DBS Event Hub.

DBS MySQL reader supports the following database types:

- MySQL versions 5.5 and later
- MariaDB

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

### Whitelist DBConvert Stream's IP Addresses

You must whitelist the IP address of the _DBS source server_ to allow connection to the MySQL server from DBConvert Stream.

In MySQL configuration file in the `[mysqld]` section add

```ini
bind-address = 0.0.0.0
```

Or add the following string, replacing `<IP address>` with an actual `IP address of the DBS source server.`

```ini
bind-address = <IP address>
```

If you have a multi-node cluster, add an entry for each DBConvert Stream source server that will run MySQL CDC Reader.

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

## MySQL reader properties.

Before using this adapter, MySQL server must be configured as described above.

An example MySQL reader configuration with a description of each property is given below:

```JSON
"source": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
    "settings": {
      "flavor": "mysql",
      "sslCA": "../certs/ca.pem",
      "sslCert": "../certs/client-cert.pem",
      "sslKey": "../certs/client-key.pem"
    },
    "filter": {
      "tables": [
        {"name": "products1", "operations": ["insert", "update", "delete"] },
        {"name": "products2", "operations": ["insert", "update", "delete"] }
      ]
    }
  }
```

General configuration options such as _type_ and _filter/tables_ are described in [Source Configuration](/sources/source-config).

## MySQL-specific options.

### Connection.

The _connection_ parameter sets up a connection to the MySQL server.

The MySQL Data Source Name (DSN) has a common format but without the type prefix (optional parts marked with square brackets):

```
[username[:password]@][protocol[(address)]]/dbname[?param1=value1&...&paramN=valueN]
```

Here is the DSN in its most complete form.

```
username:password@protocol(address)/dbname?param=value
```

All values ​​are optional except for the database name. So the minimal DSN is:

```
/dbname
```

|          | Description                                                                                                                                                                                                                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| username | MySQL User Name to use when connecting to the server.                                                                                                                                                                                                                                                                                       |
| password | Password is a string consisting of any characters.                                                                                                                                                                                                                                                                                          |
| protocol | As a general rule, you should use a Unix domain socket if available and TCP otherwise for best performance.                                                                                                                                                                                                                                 |
| address  | For TCP and UDP networks, addresses are `host[:port]` If no port is specified, the default port 3306 will be used. If host is a literal IPv6 address, it must be enclosed in square brackets. For Unix domain sockets, the address is the absolute path to the MySQL-Server socket, e.g. `/var/run/mysqld/mysqld.sock` or `/tmp/mysql.sock` |
| dbname   | The name of the database to connect to.                                                                                                                                                                                                                                                                                                     |

#### Parameters

Parameters follow after `?` as `key=value` pairs.

Parameters are case-sensitive!

> Note that parameter values ​​must be escaped. So, for example, you need to replace `/` with `%2F`. For example, US/Pacific would be locUS%2F Pacific.

### TLS/SSL Connection settings.

To enable an SSL encrypted connection, specify the SSL options in the connection string as follows:

```JSON
"connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
"settings": {
"sslCA": "../certs/ca.pem",
"sslCert": "../certs/client-cert.pem",
"sslKey": "../certs/client-key.pem"
},
```

`tls` attribute values are :

- true
- false
- skip-verify
- preffered

`tls=true` enables an encrypted TLS/SSL connection to the server. Use `skip-verify` if you want to use a self-signed or invalid certificate (on the server side), or use `preferred` to use TLS only when advertised by the server. This is similar to `skip-verify` but allows you to fall back to an unencrypted connection. Neither `skip-verify` nor `preferred` provides reliable protection.

| Path to certificate | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| sslCA               | File containing a list of trusted SSL Certificate Authorities. |
| sslCert             | File containing X.509 certificate                              |
| sslKey              | File that containing X.509 key                                 |

### Flavor.

Flavor can be either `mysql` or `mariadb`.
If not specified, `mysql` is used by default.

```JSON
"connection": "mariadb_user:passw0rd@tcp(0.0.0.0:3306)/Source",
    "settings": {
      "flavor": "mariadb"
    },
```