---
title: Connection Management Guide
description: Connection Management Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# Connection Management Guide

## Overview

DBConvert Streams provides a robust connection management interface for configuring and maintaining database connections. You can manage connections for both source and target databases through an intuitive user interface.

## Viewing Connections


![Connections Page](/images/connections/view-connections.png)

The connections page displays all your configured database connections with the following features:

- View toggle between card and table layouts
- Filter connections by type or status
- Quick access to connection details
- Connection management actions (Edit, Clone, Delete)

Each connection card shows:
- Connection name and unique ID
- Host information
- Database name
- Schema (for PostgreSQL)
- Connection string (including sensitive information securely masked)
- Creation timestamp

## Adding New Connections

![Add Connection](/images/connections/add-connection.png)

To add a new database connection:

1. Click the "New connection" button
2. Select your database type (MySQL or PostgreSQL)
3. Choose connection method (Direct or SSL)

### Basic Connection Settings

For all database types:
- **Name**: A descriptive name for your connection
- **Server**: Hostname or IP address
- **Port**: Database port number
- **User ID**: Database username
- **Password**: Database user password
- **Database**: Select existing or create new database
- **Connection String (Optional)**: Direct connection string input. If provided all other fields will be filled automatically.

### PostgreSQL-Specific Settings

Additional settings for PostgreSQL connections:
- **Schema**: Select or create new schema
- Support for multiple schemas
- New schema creation option


## SSL Configuration

![SSL Configuration](/images/connections/ssl-configuration.png)

Secure connection options include:

1. **SSL Mode**:
   - Disable
   - Require
   - Verify-CA
   - Verify-Full
   
2. **Certificate Management**:
   - CA Certificate upload
   - Client Certificate upload
   - Client Key upload
   - Supported formats: CRT, PEM

## Connection Management

Available actions for existing connections:

### Edit Connection
- Modify connection parameters
- Update credentials
- Change SSL settings
- Test modified configuration

### Clone Connection
- Create duplicate connections
- Modify cloned settings
- Useful for similar configurations

### Delete Connection
- Remove unused connections
- Confirmation required

## Best Practices

1. **Security**:
   - Use SSL for production environments
   - Regularly rotate credentials
   - Use minimum required privileges

2. **Naming Conventions**:
   - Use descriptive connection names
   - Include environment information
   - Add purpose or project reference

3. **Testing**:
   - Always test connections before saving
   - Verify database permissions
   - Check SSL certificate validity

4. **Maintenance**:
   - Regular connection testing
   - Remove unused connections
   - Keep SSL certificates updated

## Troubleshooting

Common connection issues and solutions:

1. **Connection Failures**:
   - Verify host and port
   - Check credentials
   - Confirm network access
   - Validate SSL certificates

2. **Permission Issues**:
   - Verify user privileges
   - Check database access
   - Confirm schema permissions

3. **SSL Problems**:
   - Validate certificate format
   - Check certificate expiry
   - Verify certificate chain

## Related Documentation
- [Dashboard UI Guide](/guide/dashboard-ui-guide)
- [Stream Configuration Guide](/streams/stream-configuration-guide)