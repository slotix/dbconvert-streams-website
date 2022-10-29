---
title: MySQL Writer.
description: Configure MySQL Target. MySQL writer properties.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}


The MySQL v.5.5 and higher databases is supported by DBConvert Stream writer as the target database for writing data collected from a source.

Follow the instructions on this page to set up MySQL as a target.


## Prerequisites.
 
1. An up-and-running MySQL instance.
2. The database specified in the stream configuration must exist in the target database.
3. IP addresses of DBConvert Stream apps are whitelisted on the Target Postgres server.


You have to whitelist _DBConvert Stream Target Server IP address_ to enable connecting to MySQL server from DBConvert Stream.


In MySQL config file [mysqld] section add either 

```
bind-address = 0.0.0.0
```

or

```
bind-address = <IP address>
```

where `<IP address>` is the IP address of DBConvert Stream Writer instance.



## Configuration


Here is an example JSON object describing MySQL database configured as a target.

```JSON
"target": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Destination"
  }
```

Read more about  [MySQL Connection parameters](/sources/mysql/#mysql-specific-options).

