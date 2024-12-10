---
title: PostgreSQL Conversion Mode Configuration
description: PostgreSQL Conversion Mode Configuration Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Overview

In conversion mode, DBConvert Streams reads data directly from PostgreSQL database tables. This mode is ideal for one-time data transfers and migrations, offering a straightforward approach without the complexity of WAL configuration or replication setup.

## Supported Databases

- PostgreSQL (version 10 and higher)
- Greenplum Database
- YugabyteDB
- EDB Postgres
- Citus
- CockroachDB


## Cloud Provider Configuration Guides

For cloud-hosted PostgreSQL databases, refer to these specific configuration guides:

- [Azure Database for PostgreSQL Configuration](./azure-database-configuration)
- [Google Cloud SQL PostgreSQL Configuration](./google-cloud-sql)
- [Amazon RDS PostgreSQL Configuration](./amazon-rds)
- [AWS Aurora PostgreSQL Configuration](./aws-aurora-postgres)
- [DigitalOcean CDC Setup Guide](./do-database-cdc)


## Database User Permissions

The database user needs basic read permissions:

```sql
-- Grant schema usage
GRANT USAGE ON SCHEMA schema_name TO username;

-- Grant table read access
GRANT SELECT ON ALL TABLES IN SCHEMA schema_name TO username;

-- For specific tables
GRANT SELECT ON table_name TO username;
```

## Network Access Configuration

1. Configure `postgresql.conf`:
```ini
listen_addresses = '*'     # Listen on all available addresses
# OR
listen_addresses = 'IP_address'  # Listen on specific IP
```

2. Configure `pg_hba.conf`:
```
# Allow specific IP
host    all    username    IP_address/32    md5

# Allow IP range
host    all    all    0.0.0.0/0    md5
```
