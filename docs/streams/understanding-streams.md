---
title: Understanding DBConvert Streams
description: Learn about DBConvert Streams, including stream types, configuration options, and best practices.
---

# Understanding DBConvert Streams.

## What is a Stream?

A stream in DBConvert Streams represents a configured data pipeline that moves data from a source database to a target database. Each stream defines:
- The source and target connections
- Which tables to replicate
- The mode of operation (CDC or Conversion)
- Various configuration options for controlling the data transfer

## Stream Types

DBConvert Streams supports two fundamental types of streams:

### 1. CDC (Change Data Capture) Mode
- Provides real-time streaming of changes from source to target
- Captures row-level changes (inserts, updates, and deletes)
- Ideal for keeping databases synchronized continuously
- Uses database transaction logs to track changes
- Runs continuously until manually stopped or limits are reached

### 2. Conversion Mode
- Performs one-time data transfer between databases
- Reads data directly from source tables
- Ideal for database migration or initial data loading
- Completes when all selected data has been transferred
- Optimized for bulk data movement

## Stream Configuration Options

### Basic Settings
- **Stream Name**: Optional identifier (auto-generated if not specified)
- **Data Transfer Mode**: Choose between Convert/Migrate or Stream/CDC
- **Data Bundle Size**: Controls how many records are processed together (10-1000)
- **Reporting Intervals**: Configure how often progress is reported
  - Source Reader interval (in seconds)
  - Target Writers interval (in seconds)

### Automatic Structure Creation
DBConvert Streams automatically handles structure creation on the target database:
- Automatically reads and replicates source database structure
- Intelligently adapts data types between different database systems (e.g., MySQL to PostgreSQL)
- Creates corresponding tables with appropriate field types
- Replicates indexes and keys

You can optionally configure:
- **Skip Index Creation**: Option to skip creating indexes for faster initial load
- **Table-specific Options**: Configure behavior for individual tables

For example, when migrating from MySQL to PostgreSQL, DBConvert Streams will:
1. Read the source MySQL table structure
2. Automatically map MySQL data types to their PostgreSQL equivalents
3. Create the corresponding PostgreSQL tables with adapted field types
4. Create matching indexes and keys

This automatic structure adaptation eliminates the need for manual schema conversion and ensures compatibility between different database systems.

### Stream Limits
- **Number of Events**: Stop after processing specified number of events (0 for unlimited)
- **Elapsed Time**: Stop after specified duration in seconds (0 for unlimited)

### Table Selection
- Choose specific tables to include in the stream
- Apply filters and custom queries per table
- Configure table-specific options

## Stream Lifecycle

Streams follow a defined lifecycle with various states:

1. **READY**: Initial state after stream creation, waiting for configuration
2. **RUNNING**: Active data transfer in progress
3. **FINISHED**: Successful completion of data transfer
4. **FAILED**: Error occurred during operation
5. **TIME_LIMIT_REACHED**: Stream stopped after reaching specified time duration
6. **EVENT_LIMIT_REACHED**: Stream stopped after processing specified number of events
7. **STOPPED**: Manually stopped by user

## Performance Considerations

### Data Bundle Size
- Configurable range from 10 to 1000 records per bundle
- Larger bundles (up to 1000) can improve performance for simple tables with few fields
- Smaller bundles are recommended for:
  - Tables containing many fields/columns
  - Records with binary data (BLOBs, images, etc.)
  - When memory usage needs to be optimized
- Finding the optimal bundle size may require testing with your specific data structure
- Default size works well for most standard tables

### Progress Reporting
- More frequent reporting provides better visibility
- Less frequent reporting reduces overhead
- Balance based on your monitoring needs

### Multiple Target Writers
- Can improve performance for large-scale transfers
- Helps distribute the processing load
- Requires explicit configuration in deployment

## Best Practices

1. **Stream Control**
   - Start with default settings for new streams
   - Control streams manually (pause/stop) as needed
   - Optionally set automatic limits for unattended operation:
     - Number of events
     - Time duration
   - Monitor stream status through the dashboard

2. **Monitoring**
   - Set reasonable reporting intervals
   - Monitor system logs for issues
   - Track progress through the dashboard

3. **Performance**
   - Use conversion mode for initial large transfers
   - Enable CDC mode for ongoing synchronization
   - Consider skipping indexes during initial load