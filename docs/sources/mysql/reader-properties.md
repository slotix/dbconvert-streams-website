---
title: MySQL CDC Reader properties.
description: Configure MySQL reader properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

Proper configuration of the MySQL server is necessary to use the MySQL adapter. The appropriate configuration steps vary depending on whether MySQL is being used [on-premises](/sources/mysql/) or [Amazon RDS](/sources/mysql/amazon-rds). Please refer to the relevant sections for detailed instructions.
 
An example MySQL reader configuration with a description of each property is given below:

```JSON
"source": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(1.2.3.4:3306)/Source?tls=true",
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
"connection": "mysql_user:passw0rd@tcp(1.2.3.4:3306)/Source?tls=true",
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
"connection": "mariadb_user:passw0rd@tcp(1.2.3.4:3306)/Source",
    "settings": {
      "flavor": "mariadb"
    },
```
