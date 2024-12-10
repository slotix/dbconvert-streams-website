---
title: Google Cloud SQL Connection Guide
description: Google Cloud SQL Connection Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Overview

This guide covers how to configure and connect to Google Cloud SQL databases in DBConvert Streams.

## Setting Up Cloud SQL Instance

1. Log into the [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to SQL
3. Create or select your MySQL/PostgreSQL instance

## PostgreSQL CDC Configuration

If you plan to use CDC mode with PostgreSQL, additional configuration is required:

![Google Cloud SQL PostgreSQL Flags](/images/connections/google-cloud-sql-postgres-flags.png)

1. **Enable logical replication**:
   - Go to your Cloud SQL instance in Google Cloud Console
   - Click "Edit"
   - Under "Customize your instance", find "Flags"
   - Add database flag:
     `cloudsql.logical_decoding = on`

2. **Configure user permissions** (using PostgreSQL client):

   You can either use an existing user or create a dedicated one for replication:
   ```sql
   -- Option 1: Create a new dedicated user
   CREATE USER replication_user WITH PASSWORD 'your_password';
   ALTER USER replication_user WITH REPLICATION;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO replication_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public 
   GRANT SELECT ON TABLES TO replication_user;

   -- Option 2: Use existing user (replace 'existing_user' with your username)
   ALTER USER existing_user WITH REPLICATION;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO existing_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public 
   GRANT SELECT ON TABLES TO existing_user;
   ```

## Network Configuration

1. In your Cloud SQL instance settings, go to the "NETWORKING" tab
2. Under "Instance IP assignment":
   - Ensure "Public IP" is selected
   - Note the displayed Public IP address - you'll need this for connections

3. Under "Authorized networks":
   - Click "ADD A NETWORK"
   - Add the IP address of your DBConvert Streams server
   - Provide a name for this network (e.g., "dbs")
   - For single IP address access, use CIDR format with /32 suffix
     (e.g., if your IP is 91.127.139.218, enter: `91.127.139.218/32`)

## Connection Configuration

:::warning Important
When configuring connections to Cloud SQL, always use the instance's Public IP address as the server address. Do not use the instance connection name (e.g., `project:region:instance`), as this format only works with Cloud SQL Proxy.
:::

### For MySQL Connections
1. Select MySQL as database type
2. Enter connection details:
   - Server: Use the Public IP address of your instance
   - Port: 3306
   - User ID: Your database username
   - Password: Your database password
   - Database: Your database name

### For PostgreSQL Connections
1. Select PostgreSQL as database type
2. Enter connection details:
   - Server: Use the Public IP address of your instance
   - Port: 5432
   - User ID: Your database username
   - Password: Your database password
   - Database: Your database name
   - Schema: Your schema name (default: public)

## SSL Configuration

By default, Google Cloud SQL allows unencrypted connections (not recommended for production). If you want to enable SSL:

1. In your Cloud SQL instance settings:
   - Navigate to the instance configuration
   - Enable SSL connections

2. Configure SSL in DBConvert Streams:
   - Enable SSL mode
   - Upload the SSL certificate
   - Select appropriate SSL mode

:::warning
Using unencrypted connections is not recommended for production environments.
:::