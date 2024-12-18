---
title: Stream Configuration Guide
description: Learn about the configuration options and settings available for stream setup in DBConvert Streams.
---

# Stream Configuration Guide.

## Overview

A stream in DBConvert Streams represents a configured data pipeline that moves data between source and target databases. This guide covers all configuration options and settings available for stream setup.

## Basic Stream Settings

### Stream Identification
- **Stream Name**: Optional identifier for your stream. If not specified, a unique name will be auto-generated.

### Data Transfer Configuration
- **Mode Selection**: Choose between two modes:
  - **Convert/Migrate**: One-time data transfer for migrations or initial loads
  - **CDC (Change Data Capture)**: Continuous replication of changes in real-time
- **Data Bundle Size**: Controls how many records are processed together (range: 10-1000)
  - Larger bundles (closer to 1000): Better for simple tables with few fields
  - Smaller bundles: Recommended for tables with many columns or binary data
  - Default size works well for most standard tables

### Progress Reporting
Configure how often you receive statistics about processed records and data transfer:
- **Source Reader Interval**: How frequently (in seconds) to report the number of records read and data size processed from source
- **Target Writer Interval**: How frequently (in seconds) to report the number of records written and data size transferred to target
- Set to 0 to disable progress reporting

For example, if set to 5 seconds, you'll receive updates showing:
- Number of events (records) processed
- Amount of data transferred
- Average transfer rate
during each 5-second interval.

## Table Selection and Filtering

### Table Selection
1. View available tables from your source database
2. Use checkboxes to select tables for replication
3. Use the search field to filter table names
4. Refresh table list if source database changes

### Per-Table Options
For each selected table, you can configure:
- **Custom Query**: Specify a SQL query for data selection
- **Operation Types** (CDC mode only): Choose which operations to capture
  - INSERT operations
  - UPDATE operations
  - DELETE operations
- **Index Creation**: Option to skip index creation for specific tables

## Structure Options

### Target Database Structure
- **Auto-create Structure**: Automatically create tables on target
  - DBConvert Streams handles data type mapping between different databases
  - Indexes and keys are replicated by default
- **Skip Index Creation**: Option to skip creating indexes
  - Useful for faster initial data loads
  - Indexes can be created later when data transfer is complete

## Stream Limits and Controls

### Transfer Limits
Configure optional limits to control stream execution:
- **Number of Events**: Stop after processing specified number of events
  - Set to 0 for unlimited events
  - Useful for controlled data transfer sessions
- **Elapsed Time**: Stop after specified duration in seconds
  - Set to 0 for unlimited time
  - Helpful for scheduling maintenance windows

### Stream Control Actions
Available operations during stream execution:
- **Start**: Begin data transfer
- **Pause**: Temporarily halt transfer while maintaining state
- **Resume**: Continue a paused transfer
- **Stop**: End transfer process

## Custom Queries

### Query Configuration
- Specify custom SQL SELECT queries for any source table
- Control exactly which data to transfer
- Apply filters, conditions, and limits
- Sort data as needed

Example:
```sql
SELECT * FROM products 
WHERE category = 'electronics' 
  AND price > 100 
ORDER BY last_updated 
LIMIT 1000
```

### Query Best Practices
1. Always test queries on source database first
2. Include appropriate WHERE clauses to limit data transfer
3. Consider using LIMIT for large tables

## Performance Optimization

### Bundle Size Optimization
- Start with default bundle size
- Monitor system resources and transfer speed
- Adjust based on:
  - Table complexity
  - Record size
  - Available memory
  - Network capacity

### Progress Reporting Impact
- More frequent reporting provides better visibility
- Less frequent reporting reduces overhead
- Balance based on monitoring needs
- For large datasets (millions of records), consider setting higher intervals to optimize performance


## Best Practices

1. **Initial Setup**
   - Start with default settings
   - Test with small data subset
   - Gradually optimize based on results

2. **Production Deployment**
   - Set appropriate limits for unattended operation
   - Configure progress reporting based on monitoring needs
   - Use CDC mode for ongoing synchronization
   - Use conversion mode for initial loads

3. **Monitoring**
   - Monitor system logs regularly
   - Track progress through dashboard
   - Review performance metrics

4. **Maintenance**
   - Regularly review and update custom queries
   - Monitor disk space for logs
   - Check system resource usage

## Related Documentation
- [Connection Management Guide](/connections/connection-management)
- [Dashboard UI Guide](/guide/dashboard-ui-guide)
