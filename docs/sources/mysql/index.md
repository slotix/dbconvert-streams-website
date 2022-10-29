---
title: MySQL CDC Reader configuration.
description: Using MySQL CDC. Server config. MySQL reader properties.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}


DBConvert Stream supports data ingestion from MySQL/ MariaDB via MySQL Binary Logs.

MySQL Binlogs store information about data modifications and data object modifications made on a MySQL server.

Incoming INSERT, UPDATE and DELETE events from binlogs are captured by MySQL Reader immediately after they happen.

Data change Events consumed by MySQL reader are then sent to the DBConvert Event Hub.

DBConvert Stream supports the following databases:
- MySQL versions 5.5 and later
- MariaDB

## MySQL server configuration.

In order to enable MySQL Binary Log (Binlog) replication you have to configure MySQL server.


### How to check if Binlog replication is enabled?

```sql
select @@log_bin;
```

If this statement returns 1, BinLog is active. If value returned is 0, this means that BinLog is disabled. To enable it, follow the steps below.


### Enable Binlog replication.

1. In the MySQL config file, ensure the following parameters are specified. If not, add them now.

```ini
[mysqld]
server_id        =  1
log_bin          =  mysql-bin 
binlog_format    =  row 
binlog_row_image =  full 
```

| Parameter             | Value   | Description                                                                                                                                                                                                                                                               |
|-----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| binlog_format| row| This parameter enables Binlog replication to receive insert, update and delete row events|
|binlog-row-image|full|must be `full` for MySQL, you may loose some field data if you update PK data in MySQL with `minimal` or `noblob` binlog-row-image. MariaDB only supports `full` value.|
|log_bin|mysql-bin|For ubuntu, use: `/var/log/mysql/mysql-bin.log`|

 

2. Restart the MySQL server.
3. Check Binlog again: 

```sql
SELECT @@log_bin;
```

Make sure the returned value is now equal to 1, indicating that Binlog replication is active. 

Find more information about all available options for replication and binary logs in the [replication reference guide](https://dev.mysql.com/doc/refman/8.0/en/replication-options.html) on MySQL’s documentation portal


### Whitelist DBConvert Stream's IP Addresses

You have to whitelist _DBConvert Stream Source Server IP address_ to enable connecting to MySQL server from DBConvert Stream.

In MySQL configuration file in the `[mysqld]` section add 

```ini
bind-address = 0.0.0.0
```

or add the following record, replacing `<IP address>` with the `DBConvert Stream Source Server IP address`. 

```ini
bind-address = <IP address>
```

If you have a multi-node cluster, add a record for each DBConvert Stream Source Server that will run MySQL CDC Reader.


### Grant privileges for user.

Once you have successfully completed the steps above, do the following:
1. Restart MySQL server to take effect.

The database user specified in the Stream Source configuration must have the following global privileges:

- SELECT
- SUPER or (REPLICATION_CLIENT and REPLICATION_SLAVE)

2. Provide access to Binlogs for the database user:


``` SQL
GRANT SELECT ON *.* to `mysql_user`@`%`;
```

Optionally you can control the current grans for the user with the following command:

```SQL
SHOW GRANTS FOR `mysql_user`@`%`;
```

## MySQL reader properties.

Before using this adapter, MySQL Server must be configured as described above.

MySQL reader sample configuration with each property description follows below:

```JSON
"source": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
    "settings": {
      "flavor":"mysql",
      "sslCA": "../certs/ca.pem",
      "sslCert": "../certs/client-cert.pem",
      "sslKey": "../certs/client-key.pem"
    },
    "filter": {
      "tables": [
        { "name": "products1", "operations": ["insert", "update", "delete"] },
        { "name": "products2", "operations": ["insert", "update", "delete"] }
      ]
    }
  }
```

General config options like *type* and *filter/tables* are described in [Source Configuration](/sources/source-config).


## MySQL specific options.


### Connection.

Parameter *connection* is used to establish the connection to MySQL server.


The MySQL Data Source Name has a common format, but without type-prefix (optional parts marked by squared brackets):

```
[username[:password]@][protocol[(address)]]/dbname[?param1=value1&...&paramN=valueN]
```

Here is a DSN in its fullest form.

```
username:password@protocol(address)/dbname?param=value
```

All values are optional, except for the databasename. So the minimal DSN is:

```
/dbname
```

|          | Description                                                                                                                                                                                                                                                                                                                                                    |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| username | MySQL User name  to use when connecting to the server.                                                                                                                                                                                                                                                                                                                                               |
| password | Passwords can consist of any character.                                                                                                                                                                                                                                                                                                                        |
| protocol | Generally, you should use an Unix domain socket if available and TCP otherwise for best performance.                                                                                                                                                                                                                                                           |
| address  | For TCP and UDP networks, addresses have the form  ` host[:port] ` . If port is omitted, the default port 3306 will be used. If host is a literal IPv6 address, it must be enclosed in square brackets.  For Unix domain sockets the address is the absolute path to the MySQL-Server-socket, e.g.  ` /var/run/mysqld/mysqld.sock `  or  ` /tmp/mysql.sock ` . |
| dbname   | Database name to connect to.                                                                                           

#### parameters
Parameters follows after `?` as `key=value` pairs.
Parameters are case-sensitive!

> Note that parameters' values must be escaped. So for example you have to replace `/` with `%2F`.  For example US/Pacific would be loc=US%2FPacific.



### TLS/SSL Connection settings.
To enable SSL encrypted connection specify SSL parameters in the connection string like so:

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

`tls=true` enables TLS / SSL encrypted connection to the server. Use `skip-verify` if you want to use a self-signed or invalid certificate (server side) or use `preferred` to use TLS only when advertised by the server. This is similar to `skip-verify`, but additionally allows a fallback to a connection which is not encrypted. Neither `skip-verify` nor `preferred` add any reliable security.

| Path to certificate |   Description                                                  |
| ------------------- | -------------------------------------------------------------- |
| sslCA               | File that contains list of trusted SSL Certificate Authorities |
| sslCert             | File that contains X.509 certificate                           |
| sslKey              | File that contains X.509 key                                   |


### Flavor. 
Flavor can be either `mysql` or `mariadb`. 
If not specified, `mysql` is used by default.

```JSON
"connection": "mariadb_user:passw0rd@tcp(0.0.0.0:3306)/Source",
    "settings": {
      "flavor" : "mariadb"
    },
```