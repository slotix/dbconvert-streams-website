---
title: AWS Aurora PostgreSQL CDC Setup Guide
description: Setting up AWS Aurora PostgreSQL CDC. 
layout: doc
lastUpdated: true
---

# AWS Aurora PostgreSQL CDC Setup Guide

## 1. Prerequisites

- AWS Aurora PostgreSQL cluster (version 2.x or higher)
- Proper IAM permissions to modify RDS parameters and security groups
- Source database with tables you want to replicate

## 2. Configure Aurora PostgreSQL Cluster

### 2.1 Enable Logical Replication

- Go to AWS RDS Console → Parameter Groups
- Create a new cluster parameter group or modify existing one
- Set the following parameter:

```
rds.logical_replication = 1
```

- Apply the parameter group to your Aurora cluster
- Reboot the cluster (this will cause downtime)

### 2.2 Verify Settings

After reboot, connect to your database and run:

```sql
-- Check WAL level
SHOW wal_level;  -- Should return 'logical'

-- Verify replication settings
SELECT name, setting 
FROM pg_settings 
WHERE name IN (
    'wal_level',
    'max_replication_slots',
    'max_wal_senders',
    'rds.logical_replication'
);
```

### 2.3 Grant Replication Privileges


```sql
-- Grant replication privilege to your user
ALTER USER your_user WITH REPLICATION;

-- Grant table access
GRANT SELECT ON ALL TABLES IN SCHEMA public TO your_user;
```

## 3. Network Configuration

### 3.1 Security Group Setup

- Go to AWS RDS Console → Security Groups
- Select your Aurora cluster's security group
- Add inbound rule:

``` text
Type: PostgreSQL
Port: 5432
Source: Your application's IP/security group
```

### 3.2 Configure SSL (Recommended)

 Download RDS SSL certificate:

```bash
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -O rds-ca.pem
```

## 4. Verify Replication Setup

### 4.1 Check Replication Slots


```sql
-- List replication slots
SELECT * FROM pg_replication_slots;

-- List publications
SELECT * FROM pg_publication;

-- List subscriptions (if any)
SELECT * FROM pg_subscription;
```

### 4.2 Monitor Replication

```sql
-- Check replication status
SELECT * FROM pg_stat_replication;

-- Check WAL sender processes
SELECT * FROM pg_stat_activity 
WHERE backend_type = 'walsender';
```

## 5. Connection Setup in DBConvert Streams

### Basic Connection Details

1. Select PostgreSQL as database type
2. Enter connection details:
   - Server: Your Aurora cluster endpoint
   - Port: 5432
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

```sql
-- Clean up unused replication slots
SELECT pg_drop_replication_slot('slot_name')
WHERE NOT active;

-- Monitor slot lag
SELECT slot_name, 
       pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) as replication_lag
FROM pg_replication_slots;
```

### 7. Error Handling

Common errors and solutions:

``` text
ERROR: logical decoding requires wal_level >= logical
→ Reboot cluster after setting rds.logical_replication = 1

ERROR: no pg_hba.conf entry for host
→ Check security group settings and SSL configuration

ERROR: must be superuser or have replication privilege
→ Grant necessary privileges to user
```
