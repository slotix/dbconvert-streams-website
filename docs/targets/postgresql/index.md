---
title: PostgreSQL Writer.
description: Configure PostgreSQL Target. Postgres writer properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The PostgreSQL v.10 and higher databases is supported by DBConvert Stream writer as the target database for writing data collected from a source.

Follow the instructions on this page to set up PostgreSQL as a target.

## Prerequisites.

1. An up-and-running PostgreSQL instance.
2. The database and schema specified in the stream configuration must exist in the target database.
3. IP addresses of DBConvert Stream apps are whitelisted on the Target Postgres server.

You have to whitelist _DBConvert Stream Target Server IP address_ to enable connecting to Postgres server from DBConvert Stream.

In the `postgresql.conf` file, add the _DBConvert Stream IP addresses_ or `*` for the `listen_addresses` parameter to allow all IPs to connect.

Start editing the `pg_hba.conf` which is usually located at `/etc/postgresql/<version>/main/`.

Add the IP address of _DBConvert Stream Target Server_ or 0.0.0.0 to allow all IPs to connect.

```
host         all      <user>              0.0.0.0/0            md5
```

## Configuration

Here is an example JSON object describing postgres configured as a target.

```JSON
"target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination"
  }
```

Read more about [PostgreSQL Connection parameters](/sources/postgresql/#connection-parameter).
