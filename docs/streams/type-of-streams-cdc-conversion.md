---
title: Types of Streams. CDC vs Conversion
description: Learn about the two fundamental modes of data transfer in DBConvert Streams. Change Data Capture (CDC) and Conversion.
---

# Types of Streams. CDC vs Conversion.

## Key Benefit: Universal Database Compatibility

DBConvert Streams is designed to work seamlessly with different types of databases, automatically handling all the complexities of moving data between them. This means you can:

- Transfer data between any supported databases:
  - MySQL to PostgreSQL
  - PostgreSQL to MySQL
  - MySQL to MySQL
  - PostgreSQL to PostgreSQL
- No need to worry about:
  - Data type differences between databases
  - Schema conversion
  - Syntax variations
  - Connection specifics

The system automatically:
- Adapts data types appropriately for each database
- Creates matching table structures
- Handles the technical differences behind the scenes
- Ensures data integrity during transfer

This flexibility makes DBConvert Streams particularly valuable for organizations working with multiple database types or planning database migrations.

## Change Data Capture (CDC) Mode

DBConvert Streams offers two fundamental modes for transferring data between databases: Change Data Capture (CDC) mode and Conversion mode. Each mode serves different use cases and has distinct characteristics.

## Change Data Capture (CDC) Mode

### Overview
CDC mode provides real-time streaming of changes from a source database to a target database. It captures row-level events from database transaction logs and replicates these changes to maintain synchronization between databases.

### How It Works
- Reads from database transaction logs:
  - MySQL: Binary Logs (Binlogs)
  - PostgreSQL: Write-Ahead Logs (WALs)
- Captures three types of events:
  - INSERT operations
  - UPDATE operations
  - DELETE operations
- Events are captured in order of occurrence
- Changes are streamed in real-time with minimal latency

### Use Cases
- Real-time data replication
- Database synchronization
- Live backup solutions
- Data warehousing with real-time updates
- Building event-driven architectures
- Keeping multiple systems in sync

### Requirements
- Source database must have transaction logging enabled
- MySQL: Binary logging must be configured
- PostgreSQL: Logical replication must be enabled
- Proper database user permissions

## Conversion Mode

### Overview
Conversion mode performs direct table reads for one-time data transfer between databases. It's designed for bulk data movement and initial data loading scenarios.

### How It Works
- Reads data from source database tables
- Offers flexible data selection:
  - Transfer complete tables
  - Select specific data using custom SQL queries
  - Apply filters and conditions
  - Set limits on number of records
- Uses automated slicing technique for large tables
- Processes data in configurable bundles

### Use Cases
- Database migration projects
  - Full database transfers
  - Selective data migrations
  - Subset replication
- Data filtering and transformation
  - Transfer specific records based on conditions
  - Custom data selection using SQL queries
  - Targeted data extraction
- Development environment setup
  - Create representative data samples
  - Test data preparation
- Data archiving

### Requirements
- Basic read permissions on source database
- No special logging configuration needed
- Standard database connectivity

## Key Differences

| Feature | CDC Mode | Conversion Mode |
|---------|----------|-----------------|
| Event Types | Configurable (INSERT, UPDATE, DELETE) - choose any combination | Insert only |
| Event Order | Maintained sequence | Not sequence-dependent |
| Data Source | Transaction logs | Direct table reads |
| Duration | Continuous until stopped | Completes after full transfer |
| Setup Requirements | Specific database configuration | Minimal configuration |
| Resource Impact | Lower, reads only changes | Higher, reads all data |
| Use Case | Ongoing synchronization | One-time transfer |

## Choosing the Right Mode

### Choose CDC Mode When:
- You need real-time data replication
- Changes must be captured continuously
- Source and target need to stay synchronized
- You want to capture specific types of data changes:
  - Select any combination of INSERT, UPDATE, and DELETE events
  - Configure different event types for different tables
  - Filter which changes to capture based on your needs
- You need minimal impact on source database

### Choose Conversion Mode When:
- You're performing a one-time migration
- You need to transfer either complete tables or specific data subsets
- You want to use custom SQL queries to select specific data
- You're setting up a new database
- You don't need ongoing synchronization
- Source database doesn't have CDC configuration

Conversion mode offers flexibility in data selection through:
- Full table transfers
- Custom SQL queries for selective data transfer
- Filtering options for specific records
- The ability to specify conditions, ordering, and limits in queries

## Performance Considerations

### CDC Mode
- Lower resource usage for ongoing operations
- Minimal impact on source database
- Real-time processing overhead
- Requires monitoring of log space

### Conversion Mode
- Higher initial resource usage
- More efficient for bulk transfers
- Can be optimized through bundle size
- Better for large initial data loads

## Best Practices

1. **Mode Selection**
   - Assess your synchronization needs
   - Consider source database capabilities
   - Evaluate ongoing maintenance requirements

2. **Configuration**
   - Set appropriate bundle sizes
   - Configure progress reporting intervals
   - Consider table structures when optimizing

3. **Monitoring**
   - Track progress through the dashboard
   - Monitor system resource usage
   - Keep an eye on log files