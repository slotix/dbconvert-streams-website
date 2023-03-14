---
title: PostgreSQL Writer.
description: Configure PostgreSQL Target. Postgres writer properties.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBConvert Streams Writer supports PostgreSQL databases version 10 and later as a target database for writing data collected from a source.

Follow the instructions on this page to set up PostgreSQL as a target.

## Prerequisites.

1. A running PostgreSQL instance.
2. The database and schema specified in the stream configuration must exist in the target database.
3. IP addresses of DBConvert Streams services are whitelisted on the target Postgres server.

## Whitelist DBS Target Writer.

In the `postgresql.conf` file, add the _DBS Target server IP addresses_ or `*` for the `listen_addresses` parameter to allow all IPs to connect.

Start editing the `pg_hba.conf`, which is usually found at `/etc/postgresql/<version>/main/`.

Add the IP address of _DBConvert Streams Target Server_ or 0.0.0.0 to allow all IPs to connect.

```
host         all      <user>              0.0.0.0/0            md5
```

## Configuration

Here is an example of a JSON object describing Postgres configured as a target.

```JSON
"target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination"
  }
```

Learn more about [PostgreSQL Connection parameters](/sources/postgresql/postgresql-server#connection-parameter).
