---
title: DBConvert Streams releases.
description: DBConvert Streams latest releases page with download links.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.2/dbs-v0.8.2-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.2/dbs-v0.8.2-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.2/dbs-v0.8.2-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.2/dbs-v0.8.2-linux-arm64.zip)   |

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.1/dbs-v0.8.1-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.1/dbs-v0.8.1-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.1/dbs-v0.8.1-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.1/dbs-v0.8.1-linux-arm64.zip)   |

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.0/dbs-v0.8.0-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.0/dbs-v0.8.0-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.0/dbs-v0.8.0-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.8.0/dbs-v0.8.0-linux-arm64.zip)   |

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.8/dbs-v0.7.8-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.8/dbs-v0.7.8-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.8/dbs-v0.7.8-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.8/dbs-v0.7.8-linux-arm64.zip)   |

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.5/dbs-v0.7.5-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.5/dbs-v0.7.5-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.5/dbs-v0.7.5-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.5/dbs-v0.7.5-linux-arm64.zip)   |

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

Latest binaries are available at :

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.0/dbs-v0.7.0-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.0/dbs-v0.7.0-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.0/dbs-v0.7.0-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.7.0/dbs-v0.7.0-linux-arm64.zip)   |

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

Choose the appropriate archive for your platform from the table with links
below.

| Operating System | Architecture | Size     | Link                                                                                |
| ---------------- | ------------ | -------- | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | 15.14 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.2/dbs-v0.5.2-linux-amd64.zip)   |
| Mac OS X         | AMD64        | 15.77 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.2/dbs-v0.5.2-darwin-amd64.zip)  |
| Windows          | AMD64        | 15.3 MB  | [Download](https://dbconvert.com/downloads/dbs/v0.5.2/dbs-v0.5.2-windows-amd64.zip) |
| Linux            | ARM64        | 13.75 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.2/dbs-v0.5.2-linux-arm64.zip)   |

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

Or binaries for different OS are available, choose the one suitable for your
platform from the links below.

| Operating System | Architecture | Size     | Link                                                                                |
| ---------------- | ------------ | -------- | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | 15.13 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-linux-amd64.zip)   |
| Mac OS X         | AMD64        | 15.76 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-darwin-amd64.zip)  |
| Windows          | AMD64        | 15.3 MB  | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-windows-amd64.zip) |
| Linux            | ARM64        | 13.75 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-linux-arm64.zip)   |

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
