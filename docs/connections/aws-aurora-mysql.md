---
title: AWS Aurora MySQL CDC Setup Guide
description: Setting up AWS Aurora MySQL CDC.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## 1. Prerequisites

- AWS Aurora MySQL cluster (version 2.x or higher)
- Proper IAM permissions to modify RDS parameters and security groups
- Source database with tables you want to replicate

## 2. Configure Aurora MySQL Cluster

### 2.1 Enable Binary Logging

- Go to AWS RDS Console → Parameter Groups
- Create a new cluster parameter group or modify existing one
- Set the following parameters:

```
binlog_format = ROW
binlog_row_image = FULL
binlog_checksum = NONE
```

- Apply the parameter group to your Aurora cluster
- Reboot the cluster (this will cause downtime)

### 2.2 Verify Settings

After reboot, connect to your database and run:

```sql
-- Check binary log settings
SHOW VARIABLES LIKE 'binlog%';

-- Verify binary logging is enabled
SHOW BINARY LOGS;

-- Check binary log format
SELECT @@binlog_format, @@binlog_row_image;
```

### 2.3 Grant Replication Privileges

```sql
-- Create user with replication privileges
CREATE USER 'repl_user'@'%' IDENTIFIED BY 'your_password';

-- Grant necessary privileges
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl_user'@'%';
GRANT SELECT ON database_name.* TO 'repl_user'@'%';
FLUSH PRIVILEGES;
```

## 3. Network Configuration

### 3.1 Security Group Setup

- Go to AWS RDS Console → Security Groups
- Select your Aurora cluster's security group
- Add inbound rule:

```text
Type: MySQL/Aurora
Port: 3306
Source: Your application's IP/security group
```

### 3.2 Configure SSL (Recommended)

Download RDS SSL certificate:

```bash
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -O rds-ca.pem
```

## 4. Verify Replication Setup

### 4.1 Check Binary Log Status

```sql
-- Show binary log status
SHOW MASTER STATUS;

-- Show binary log events
SHOW BINLOG EVENTS;

-- List active replication channels
SHOW SLAVE STATUS;
```

### 4.2 Monitor Replication

```sql
-- Check replication status
SHOW PROCESSLIST;

-- Show replication filters
SHOW SLAVE STATUS\G
```

## 5. Connection Setup in DBConvert Streams

### Basic Connection Details
1. Select MySQL as database type
2. Enter connection details:
   - Server: Your Aurora cluster endpoint
   - Port: 3306
   - User ID: Your database username
   - Password: Your database password
   - Database: Your database name

### SSL Configuration
1. Download RDS SSL certificate:

```bash
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -O rds-ca.pem
```
2. In DBConvert Streams:
   - Enable SSL mode
   - Upload the downloaded certificate
   - Select "Verify-CA" as SSL mode

## 6. Best Practices

### 6.1 Maintenance

```sql
-- Purge old binary logs
PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 3 DAY);

-- Monitor binary log space
SELECT @@log_bin, @@binlog_format, @@max_binlog_size;

-- Check binary log space usage
SHOW BINARY LOGS;
```

### 6.2 Error Handling

Common errors and solutions:

```text
ERROR: Binary logging not enabled
→ Enable binary logging and set binlog_format = ROW

ERROR: Access denied for replication user
→ Check user privileges and grants

ERROR: Cannot connect to MySQL server
→ Check security group settings and SSL configuration

ERROR: The slave is connecting using CHANGE MASTER TO MASTER_AUTO_POSITION = 1
→ Ensure GTID mode is enabled if using auto-positioning
```
