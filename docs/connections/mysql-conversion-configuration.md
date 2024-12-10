---
title: MySQL Conversion Mode Configuration
description: MySQL Conversion Mode Configuration Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Overview

In conversion mode, DBConvert Streams reads data directly from MySQL database tables. This mode is typically used for one-time data transfers, such as database migration or consolidation. The configuration process is simpler than CDC mode as it doesn't require binary logs or replication setup.

## Supported Databases

- MySQL versions 8.0 and later
- MariaDB
- SingleStore DB (formerly MemSQL)
- TiDB
- Percona
- Vitess


## Cloud Provider Configuration Guides

For cloud-hosted MySQL databases, refer to these specific configuration guides:

- [Azure Database for MySQL Configuration](./azure-database-configuration)
- [Google Cloud SQL MySQL Configuration](./google-cloud-sql)
- [Amazon RDS MySQL Configuration](./amazon-rds)
- [AWS Aurora MySQL Configuration](./aws-aurora-mysql)
- [DigitalOcean CDC Setup Guide](./do-database-cdc)


## Database User Permissions

The database user only needs basic read permissions:

```sql
-- Grant SELECT permission on specific database
GRANT SELECT ON database_name.* TO 'user'@'%';

-- Verify permissions
SHOW GRANTS FOR 'user'@'%';
```

## Network Access Configuration

In the MySQL configuration file (`my.cnf` or `my.ini`), configure network access:

```ini
[mysqld]
bind-address = 0.0.0.0  # Allow all connections
# OR
bind-address = <IP address>  # Allow specific IP
```
