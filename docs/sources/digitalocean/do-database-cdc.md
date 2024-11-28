---
title: DigitalOcean Managed Database CDC Setup Guide
description: Setting up Change Data Capture for DigitalOcean MySQL and PostgreSQL databases
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

This guide covers how to enable and configure Change Data Capture (CDC) for DigitalOcean's managed MySQL and PostgreSQL databases.

## 1. Prerequisites

- DigitalOcean account with managed database cluster
- Database connection credentials
- Access to database configuration
- Firewall/network access to database

## 2. MySQL Configuration

### 2.1 Binary Logging Status

Binary logging is enabled by default on DigitalOcean managed MySQL databases. Verify the current configuration:

```sql
-- Check binary log settings
SHOW VARIABLES LIKE 'binlog_format';
SHOW VARIABLES LIKE 'binlog_row_image';
SHOW VARIABLES LIKE 'expire_logs_days';

-- Verify binary logging is enabled
SHOW BINARY LOGS;

-- Check current binary log position
SHOW MASTER STATUS;
```

⚠️ **Note**: DigitalOcean managed databases have pre-configured settings for binary logging. Configuration changes require DigitalOcean support assistance.

### 2.2 Configure MySQL User Privileges

```sql
-- Create replication user
CREATE USER 'cdc_user'@'%' IDENTIFIED BY 'strong_password';

-- Grant required privileges
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'cdc_user'@'%';
GRANT SELECT ON database_name.* TO 'cdc_user'@'%';
FLUSH PRIVILEGES;

-- Verify user privileges
SHOW GRANTS FOR 'cdc_user'@'%';
```

## 3. PostgreSQL Configuration

### 3.1 Logical Replication Status

DigitalOcean PostgreSQL databases have logical replication enabled by default. Verify the settings:

```sql
-- Check WAL level
SHOW wal_level;

-- Verify replication settings
SELECT name, setting 
FROM pg_settings 
WHERE name IN (
    'wal_level',
    'max_replication_slots',
    'max_wal_senders'
);
```

### 3.2 Configure PostgreSQL User Privileges

```sql
-- Create replication user
CREATE USER cdc_user WITH REPLICATION PASSWORD 'strong_password';

-- Grant necessary privileges
GRANT SELECT ON ALL TABLES IN SCHEMA public TO cdc_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO cdc_user;

-- Verify user privileges
\du cdc_user
```

## 4. Network Access Configuration

### 4.1 Configure Trusted Sources

1. Navigate to **DigitalOcean Console** → **Databases**
2. Select your database
3. Go to **Settings** → **Trusted Sources**
4. Add your application's IP addresses:
   - Click **Add trusted source**
   - Enter IP address or range
   - Add description (e.g., "CDC Application")
   - Click **Save**

### 4.2 Connection Information

1. In the database cluster overview, find the connection details:
   - Host
   - Port
   - Database name
   - Username
   - Password

Connection string formats:

MySQL:
```text
mysql://cdc_user:password@host:port/database
```

PostgreSQL:
```text
postgresql://cdc_user:password@host:port/database
```

## 5. Monitoring and Maintenance

### 5.1 MySQL Monitoring

```sql
-- Check replication status
SHOW MASTER STATUS;

-- Monitor binary log space
SHOW BINARY LOGS;

-- Check current connections
SHOW PROCESSLIST;

-- Monitor binary log usage
SELECT @@log_bin, @@binlog_format;
```

### 5.2 PostgreSQL Monitoring

```sql
-- Check replication slots
SELECT * FROM pg_replication_slots;

-- Monitor WAL segments
SELECT * FROM pg_stat_replication;

-- Check current connections
SELECT * FROM pg_stat_activity WHERE backend_type = 'walsender';
```

## 6. Best Practices

1. **User Management**
   - Create dedicated users for CDC
   - Use strong passwords
   - Grant minimum required privileges
   - Regular credential rotation

2. **Network Security**
   - Restrict trusted sources to specific IPs
   - Regular audit of trusted sources
   - Use SSL/TLS for connections

3. **Monitoring**
   - Monitor replication lag
   - Track disk usage
   - Set up alerts for connection issues

## 7. Troubleshooting

Common issues and solutions:

### 7.1 MySQL Issues

```text
ERROR: Access denied for user
→ Verify user privileges
→ Check IP is in trusted sources
→ Confirm password is correct

ERROR: Binary log position not found
→ Check binary log retention
→ Verify replication user privileges
```

### 7.2 PostgreSQL Issues

```text
ERROR: no pg_hba.conf entry
→ Add IP to trusted sources
→ Wait for trusted source to propagate

ERROR: replication slot creation failed
→ Check available replication slots
→ Verify user has REPLICATION privilege
```

## 8. Limitations

1. **MySQL**
   - Cannot modify binary log format
   - Binary log retention period is fixed
   - Limited configuration options

2. **PostgreSQL**
   - Fixed number of replication slots
   - Cannot modify WAL retention
   - Pre-configured WAL settings

## 9. Additional Resources

- [DigitalOcean Database Documentation](https://docs.digitalocean.com/products/databases/)
- [MySQL Replication Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [PostgreSQL Logical Replication](https://www.postgresql.org/docs/current/logical-replication.html) 