---
title: Enabling External Access to AWS Aurora
description: Guide to securely configure external access to Aurora MySQL and PostgreSQL clusters via AWS Console
layout: doc
lastUpdated: true
---

# Enabling External Access to AWS Aurora.

This guide covers how to enable secure external access to your AWS Aurora clusters from outside AWS using the AWS Management Console.

## 1. Prerequisites

- AWS Aurora cluster (MySQL or PostgreSQL)
- AWS IAM permissions to access:
  - VPC Console
  - RDS Console
  - EC2 Console (for Security Groups)

## 2. VPC Configuration

### 2.1 Configure Internet Gateway

1. Navigate to **VPC Console** → **Internet Gateways**
2. Click **Create internet gateway**
3. Enter a name (e.g., `aurora-igw`)
4. Click **Create**
5. Select the new gateway and click **Actions** → **Attach to VPC**
6. Select your VPC and click **Attach**

### 2.2 Configure Route Tables

1. Go to **VPC Console** → **Route Tables**
2. Select the route table associated with your Aurora subnets
3. In the **Routes** tab below, click **Edit routes**
4. Add a new route:
   - Destination: `0.0.0.0/0`
   - Target: Select your Internet Gateway
5. Click **Save changes**

## 3. Security Group Configuration

### 3.1 Create Database Security Group

1. Navigate to **EC2 Console** → **Security Groups**
2. Click **Create security group**
3. Enter basic details:
   - Security group name: `aurora-external-access`
   - Description: `Security group for external Aurora access`
   - VPC: Select your Aurora VPC

4. Add inbound rules:

For MySQL:
```text
Type: MySQL/Aurora (3306)
Source: Custom
IP: Your specific IP range (e.g., 203.0.113.0/24)
Description: Office network
```

For PostgreSQL:
```text
Type: PostgreSQL (5432)
Source: Custom
IP: Your specific IP range (e.g., 203.0.113.0/24)
Description: Office network
```

5. Click **Create security group**

### 3.2 Apply Security Group to Aurora

1. Go to **RDS Console** → **Databases**
2. Select your Aurora cluster
3. Click **Modify**
4. Under **Connectivity**, find **Security groups**
5. Add your new security group
6. Click **Continue** and choose when to apply modifications

## 4. Database-Specific Configuration

### 4.1 MySQL User Setup

Connect to your database using a client tool and run:

```sql
-- Create user with external access
CREATE USER 'external_user'@'%' IDENTIFIED BY 'strong_password';

-- Grant privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'external_user'@'%';
FLUSH PRIVILEGES;

-- Verify user creation
SELECT user, host FROM mysql.user WHERE user = 'external_user';
```

### 4.2 PostgreSQL User Setup

Connect to your database using a client tool and run:

```sql
-- Create user
CREATE USER external_user WITH PASSWORD 'strong_password';

-- Grant privileges
GRANT CONNECT ON DATABASE database_name TO external_user;
GRANT USAGE ON SCHEMA public TO external_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO external_user;
```

## 5. Enable SSL/TLS

### 5.1 Download Certificate

1. Visit [Amazon RDS SSL/TLS certificates](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html)
2. Download the global bundle certificate
3. Save as `global-bundle.pem`

### 5.2 Configure SSL in RDS Console

1. Go to **RDS Console** → **Databases**
2. Select your Aurora cluster
3. Click **Modify**
4. Under **Additional configuration**, find **SSL/TLS**
5. Select **Force SSL/TLS**
6. Apply changes

### 5.3 Connection Examples

MySQL Workbench:
1. Create new connection
2. Enter host: `<aurora-endpoint>`
3. Enter user: `external_user`
4. Under SSL tab:
   - Use SSL: Yes
   - SSL CA File: Select `global-bundle.pem`

pgAdmin:
1. Create new server
2. Under Connection tab:
   - Host: `<aurora-endpoint>`
   - Username: `external_user`
3. Under SSL tab:
   - SSL Mode: Verify-Full
   - Root certificate: Select `global-bundle.pem`

## 6. Monitoring Setup

### 6.1 Enable Enhanced Monitoring

1. Go to **RDS Console** → **Databases**
2. Select your cluster
3. Click **Modify**
4. Under **Monitoring**:
   - Enable Enhanced monitoring
   - Choose monitoring interval (e.g., 60 seconds)
5. Apply changes

### 6.2 Configure CloudWatch Alarms

1. Navigate to **CloudWatch Console** → **Alarms**
2. Click **Create alarm**
3. Select metrics:
   - Database connections
   - Failed login attempts
   - CPU utilization
4. Set appropriate thresholds
5. Configure notifications

## 7. Best Practices

1. **IP Restriction**
   - Only whitelist necessary IP addresses
   - Document all allowed IP ranges
   - Review security group rules monthly

2. **User Management**
   - Create separate users for different applications
   - Use strong passwords
   - Rotate credentials regularly

3. **SSL/TLS**
   - Always enforce SSL connections
   - Update certificates before expiration
   - Test SSL connections after updates

4. **Monitoring**
   - Review CloudWatch metrics regularly
   - Set up alerts for suspicious activities
   - Monitor connection counts

## 8. Troubleshooting

Common issues and solutions:

```text
Cannot connect to database:
→ Verify security group allows your IP
→ Check that your IP hasn't changed
→ Confirm SSL certificate is valid

Connection timeout:
→ Verify route table configuration
→ Check network ACLs
→ Confirm security group rules

Access denied:
→ Verify user permissions
→ Check SSL is configured correctly
→ Confirm password is correct
```
