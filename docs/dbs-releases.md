---
title: Release History (2022-2023).
description: DBConvert Streams release archives with download links.
layout: doc
lastUpdated: true
---

# Release History (2022-2023).


## Version 0.8.6

:calendar: December 18, 2023


### Features

- Added dynamic addition of new consumers to DBConvert Streams during runtime.
  - Consumers automatically start consuming messages from the current stream (job).

### Bug Fixes

- Fixed a bug related to streaming data from Postgres CDC, ensuring it now works correctly.
- Resolved a bug with streaming data from multiple tables.


### Performance Improvements

- Improved encoding/decoding performance by using `github.com/json-iterator/go` instead of `encoding/json`.
- Achieved a speed increase of approximately 20% in data transfer from source to targets.

Find more info about it at [Measure the performance of different codecs](https://github.com/slotix/dbconvert-streams-public/issues/15) issue. 



### Error Handling Enhancements

- Enhanced error handling in the API:
  - The API now cleans the state of the current stream (job) in case of an error.
  - Source reader notifies the target writer about the error.
  - Target writer can stop the job to prevent running indefinitely.

### Stream Configuration

- If no operations are specified for a table in the filter section of the stream configuration, all operations are now allowed.

### Status Messages

- Shortened status messages in source and target.
  - Caller information, e.g., `target/consumers.go:152`, is now omitted.

### Stats Info

- Stats information now includes rate details:

```bash
[2023/12/18 23:06:41] [info] [target] RUNNING, 468,000 events, 1.4 GB, Rate: 156.1 MB/s
[2023/12/18 23:06:46] [info] [target] RUNNING, 721,000 events, 2.1 GB, Rate: 153.6 MB/s
[2023/12/18 23:06:51] [info] [target] RUNNING, 966,000 events, 2.9 GB, Rate: 148.8 MB/s
[2023/12/18 23:06:52] [info] [target] FINISHED, 1,000,000 events, 3.0 GB, Rate: 19.4 MB/s, Elapsed: 20.003858023s
```



## Version 0.8.5

:calendar: December 05, 2023

### DBConvert Streams Update:

Our DBConvert Streams now seamlessly supports the conversion from MySQL blob types to PostgreSQL bytea type. This ensures a smooth and reliable data migration experience between MySQL and PostgreSQL databases.

### Logging Improvements:

Enjoy enhanced logging capabilities with the introduction of the `--log-file` flag when starting DBS services.
When launching the DBS API, include the `--log-file api.log` flag to direct logs to a specific file (`api.log` in this case).

#### Examples:

```bash
dbs-api --log-file api.log
dbs-source-reader --log-file source.log
dbs-target-writer --log-file target.log
```

### Experimental:

We've increased the default size of NATS message payload to 64 Mb. Give it a try and let us know how it works for you.


We appreciate your ongoing support and feedback. Should you encounter any issues or have suggestions for further improvements, please reach out to us.

Happy migrating!


## Version 0.8.4

:calendar: December 04, 2023

### Bug Fix: Addressing NATS Message Payload Size Issue
- The issue reported on [GitHub](https://github.com/slotix/dbconvert-streams-public/issues/7) related to NATS message payload size limitations has been resolved.
In response to this, we've raised the default size of the NATS message payload to 4 MB in our latest release. 

### Improved Stream Configuration Retrieval:
- In this release, we have replaced ephemeral consumers with durable consumers for fetching stream configurations from the API for both source and target services. The utilization of durable consumers ensures a more reliable and consistent stream configuration transmission between source and target services.

### General Updates
- Moved Acks of gotten stream configurations by source reader and target writers from the end to the beginning of the message handler function. This change aims to avoid timeout issues in NATS.

### Statistics Enhancements
- Added separate statistics for each table in the source reader, providing more granular insights into the system's performance.

### Database Structure Creation
- Implemented a modification to ensure that only one target writer handles the creation of the structure on the target database. This adjustment helps prevent collisions during the structure creation process.

### API Improvements
- Resolved deadlocks occurring when obtaining combined statistics of Source and Target Nodes from the API. Users can now seamlessly retrieve and analyze comprehensive statistics without encountering performance issues.

### Error Handling
- Improved resilience by limiting attempts to obtain Target Writer consumers from Source Reader. The system will now give up after 10 failed attempts, preventing infinite loops that occurred in previous versions.

### Enhancement: Improved PostgreSQL Error Messages

We've enhanced the verbosity of PostgreSQL error messages to provide more detailed information when errors occur. Users can now expect to see detailed error logs that include specific error details.

**example:**

```
failed to insert into table products: ERROR: duplicate key value violates unique constraint "products_pkey" (SQLSTATE 23505). Detail: Key (id)=(9001) already exists.
```




## Version 0.8.3

:calendar: November 19, 2023


### Custom SQL Queries for source Table Definitions.

- Introducing a new feature that allows users to specify custom SQL queries for individual tables in the filter section.
- This enhancement provides greater flexibility and control over data retrieval from the source database.
- Users can now customize queries for each table, including conditions, ordering, limiting, and more.

#### Configuration Example

Each table definition in the filter section includes a `query` parameter for custom SQL queries.
Users can adjust queries according to specific use cases, tailoring data retrieval to their requirements.

```json{12,16}
{
  "source": {
    "type": "mysql",
    "mode": "convert",
    "connection": "root:123456@tcp(0.0.0.0:3306)/file",
    "dataBundleSize": 100,
    "reportingInterval": 5,
    "filter": {
      "tables": [
        {
          "name": "oc_filecache",
          "query": "SELECT * FROM oc_filecache ORDER BY file_id LIMIT 3042 OFFSET 2055"
        },
        {
          "name": "another_table",
          "query": "SELECT * FROM another_table WHERE storage > 10 LIMIT 3042"
        }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@0.0.0.0:5432/postgres",
    "reportingInterval": 5
  }
}
```

### Added Support for Converting MySQL enum Types to PostgreSQL

This addition ensures a seamless transition for enum types during the MySQL to PostgreSQL conversion process.



## Version 0.8.2

:calendar: November 17, 2023

### Features:


### Enhancements:

#### Data Transfer Monitoring:

- Introducing the addition of `Total data size:` to the streaming statistics.
  With this update, users can now stay informed about the total data size being
  processed during the streaming operation. This real-time statistic is
  seamlessly integrated into the streaming statistics, offering a more detailed
  overview of the ongoing transfer.

#### Message Redelivery:

- The message redelivery mechanism is designed to address errors
  that may occur during the processing of data on the target side, ensuring that
  no message is left undelivered.

#### Events Hub Management:

- Introducing the ability to remove all streams from the Events Hub through new
  API endpoint. In this release, we are addressing an issue where orphaned
  messages may accumulate in the Events Hub, consuming unnecessary disk space.
  To mitigate this, a new endpoint has been introduced, allowing users to
  efficiently remove all streams from the Events Hub. This can be particularly
  useful in scenarios where stream consumption has faced disruptions, and
  lingering unconsumed messages need to be cleared. **Example usage:**

```bash
curl --request DELETE --url http://127.0.0.1:8020/api/v1/streams
```


## Version 0.8.1

:calendar: November 12, 2023

### Features:

**Retry Logic Enhancement:**

- Introducing improved reliability with the addition of retry logic. Implemented
  a simple for loop that intelligently retries transactions, enhancing the
  system's ability to handle transient errors. Transactions will now be
  attempted a configurable number of times before returning an error.

### Configuration Enhancement:

**ReportingInterval Parameter:**

- Added a new configuration parameter, `reportingInterval`, allowing users to
  define the frequency at which progress reports are generated. Enhance your
  experience by staying informed about the status of data transfer between the
  source reader and target writer services. If `reportingInterval` is set to
  zero, no statistics will be returned while the stream is running, providing
  flexibility for silent operation.


## Version 0.8.0

:calendar: November 09, 2023

### New Features:

- **Automated Index and Foreign Key Conversion:** Streamline your development
  process with the new automated conversion feature. Now, when creating table
  structures on the target, all indexes and foreign keys are automatically
  converted, making it effortless to manage your database relationships within
  the application.

- **Optimizing `dataBundleSize` for Efficiency:** Adjust the `dataBundleSize`
  parameter in the reader for improved performance. While the default of 100
  suits regular tables, consider tweaking it for larger or "fat" record tables.
  `dataBundleSize` determines the number of rows transmitted to NATS in a single
  operation, tailoring it ensures efficient data flow without straining the
  system.

### Bug fixes:

- **Enhanced Error Handling for "Slow Consumer, Messages Dropped" Scenarios:**
  In situations where transferring substantial rows with larger data sizes leads
  to the NATS error "slow consumer, messages dropped," this release introduces a
  solution. Now, with the addition of the `dataBundleSize` parameter in the
  stream configuration, you can mitigate such errors.


## Version 0.7.8

:calendar: November 06, 2023

**Release Notes:**

- Updated codebase to leverage the new NATS Jetstream API for enhanced
  performance and reliability.

**Bug fixes:**

- Fixed concurrency issue when converting multiple tables at once.
  [Issue #4 on GitHub](https://github.com/slotix/dbconvert-streams-public/issues/4)

- Fixed Postgres types during the conversion process from MySQL, ensuring
  accurate generation of `CREATE TABLE` statements.
  [Issue #4 on GitHub](https://github.com/slotix/dbconvert-streams-public/issues/4)

- Resolved issue with incorrect conversion of JSON field structures from MySQL
  to PostgreSQL.
  [Issue #1 Link on GitHub](https://github.com/slotix/dbconvert-streams-public/issues/1)


## Version 0.7.5

:calendar: July 11, 2023

**Release Notes:**

- Added endpoints to the REST API for managing connections, allowing users to
  create, list, retrieve information, and delete connections.
- Increased the coverage of integration tests by adding more comprehensive test
  cases.

**Bug fixes:**

- Fixed an issue where table filters were not functioning correctly.
- Improved handling of tables with names containing dots, such as
  `private.products`.
- Adjusted table name processing on the target to remove the `public` schema
  name, except for table names other than `public`.


## Version 0.7.0

:calendar: May 15, 2023

**Release Notes:**

- Added "Convert" mode for MySQL and Postgres sources. In conversion mode, data
  is read directly from the tables of the source database. It is now mandatory
  to specify the mode parameter in the source section of a stream configuration.
  Read more about conversion mode [here](/sources/conversion-mode).
- Updated the stream configuration to make the "Filter" section optional. If no
  filters are specified or the section is left empty, DBConvert Streams will
  automatically monitor all tables in CDC mode and convert all tables in
  "convert" mode.
- Added
  [conversion examples](https://github.com/slotix/dbconvert-streams-public/tree/main/examples-convert)
  to public github repository.
- Added capability to convert multiple tables in parallel between source and
  target databases.

**Bug fixes:**

- Fixed a bug that caused data to be potentially received before the
  corresponding table was created on the target.


## Version 0.5.2

:calendar: January 12, 2023

**Release Notes:**

- The DBConvert Streams documentation now includes a search feature. To access
  it, press `<Ctrl>+k` on any page.
  ![Search dialog](/images/releases/search-dialog.png)

- Added
  [examples for streaming data between MySQL and PostgreSQL](https://github.com/slotix/dbconvert-streams-public)
  - [MySQL Binlog to PostgreSQL Streaming](https://dbconvert.com/blog/streaming-data-mysql-postgres)
  - PostgreSQL WALs to MySQL DB Streaming.
  - Streaming from MySQL to another MySQL DB
  - Streaming from Postgres WALs to another PostgreSQL
- Added functionality for MySQL DB types to automatically create the target
  database if it does not already exist
- Added support for the
  [`pool_max_conn_idle_time` and `pool_max_conn_lifetime` parameters for PostgreSQL sources](/sources/postgresql/postgresql-server#timeout-parameters).
  It can be useful to adjust these parameters in cases where the time between
  transactions is longer than 30 minutes.


## Version 0.5.1

:calendar: December 18, 2022

Maintaining database consistency in today's distributed systems has become more
complex than it used to be in legacy applications.\
The best way to speed up the data replication process is to combine multiple
INSERT statements from the source database into groups and send them to the
destinations concurrently.

There have been test cases with Postgres databases where the INSERT batches
arrive before the table is actually created on the target. To avoid such
situations, all table structures on destinations are now always created before
any INSERT, UPDATE and DELETE statements.

[A sample docker-compose file for starting DBConvert Streams](https://github.com/slotix/dbconvert-streams-public/blob/be59cabcda3f3ccb340bdb8b40b5cfb31b1917ab/docker-compose.yml).


## Version 0.5.0

:calendar: November 22, 2022

We are excited to announce the release of DBConvert Streams 0.5.0! This if the
first public release of DBS that replicates data between MySQL and PostgreSQL.

The easiest way to get started with DBConvert Streams is to use the
[docker-compose configuration file](https://github.com/slotix/dbconvert-streams-public/blob/be59cabcda3f3ccb340bdb8b40b5cfb31b1917ab/docker-compose.yml).

If you prefer install binaries, choose the right release archive for your
platform from the download links below.

| Operating System | Architecture | Size    | Link                                                                                |
| ---------------- | ------------ | ------- | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | 15.1 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-linux-amd64.zip)   |
| Mac OS X         | AMD64        | 15.8 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-darwin-amd64.zip)  |
| Windows          | AMD64        | 15.3 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-windows-amd64.zip) |
| Linux            | ARM64        | 13.7 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-linux-arm64.zip)   |
