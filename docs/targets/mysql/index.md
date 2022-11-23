---
title: MySQL Writer.
description: Configure MySQL Target. MySQL writer properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The DBS Writer supports MySQL databases version 5.5 and higher as the target database for writing data collected from the source.

Follow the instructions on this page to set up MySQL as a target.

## Prerequisites.

1. A running MySQL instance.
2. The database specified in the stream configuration must exist in the target database.
3. IP addresses of DBS Target are whitelisted on the target MySQL server.

## Whitelist DBS Target Writer.

In the MySQL configuration file [mysqld], add either

```
bind-address = 0.0.0.0
```

or

```
bind-address = <IP address>
```

Where `<IP address>` is the IP address of DBConvert Streams Writer instance.

## Configuration

Here is an example JSON object describing a MySQL database configured as a target.

```JSON
"target": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Destination"
  }
```

Learn more about [MySQL connection options](/sources/mysql/#mysql-specific-options).
