---
title: DBConvert Streams releases in 2024.
description: DBConvert Streams latest releases page with download links.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Version 0.10.9

:calendar: March 2, 2024


### New Features

1. **Log-Level Flag for Services**
   - Introducing a new `log-level` flag for services to provide greater flexibility in logging configurations. Users can now specify the `debug` log level for each of DBConvert Streams service, allowing for more fine-grained control over the verbosity of logs.

### Bug Fixes

1. **Improved Handling of Service Statuses during Database Operations**
   - Resolved an issue related to the [handling of services statuses](https://github.com/slotix/dbconvert-streams-public/issues/13) during the creation of tables and indexes on the target database. Users can now expect more accurate and reliable service status updates during these database operations.

2. **Fixed Year Type Handling for MariaDB to PostgreSQL Migration**
   - Addressed a specific issue in the migration process from MariaDB to PostgreSQL where the handling of year type data was not accurate. The migration now correctly interprets and transfers year type data, ensuring data integrity and consistency between the two database systems.


| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.9/dbs-v0.10.9-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.9/dbs-v0.10.9-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.9/dbs-v0.10.9-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.9/dbs-v0.10.9-linux-arm64.zip)   |


Visit the [DBConvert Streams Docker Guide](https://stream.dbconvert.com/guide/dbs-docker) for detailed instructions on setting up and running DBConvert Streams in a Docker environment.

We appreciate your ongoing feedback. Please don't hesitate to reach out if you encounter any issues or have suggestions for further improvements. Thank you for choosing DBConvert Streams!



## Version 0.10.7

:calendar: February 28, 2024


### Table Structure Creation Handling:

A notable improvement has been implemented to handle cases where a writer instance tries to insert data before the target table structure is established on the destination database.

The target writer, responsible for creating table structures, now notifies other target writer instances upon the successful completion of the structure creation process.



| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.7/dbs-v0.10.7-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.7/dbs-v0.10.7-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.7/dbs-v0.10.7-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.7/dbs-v0.10.7-linux-arm64.zip)   |



## Version 0.10.6


:calendar: February 22, 2024

1. **Improved Error Handling:** In this release, we've refined the processing mechanism to handle indexes one by one. This enhancement ensures better error handling throughout the processing pipeline.
1. **Enhanced Logging Errors and Warnings:** We recognize the critical nature of migrating tables and index structures across diverse database types. With this release, our logging capabilities have been substantially bolstered. You can now expect more detailed information about potential issues related to the database engine. 
1. **Date Field Conversion Fix:** We've addressed a critical issue related to date fields containing values like "0000-00-00" during the conversion from MySQL to Postgres. The fix ensures accurate and seamless conversion, preventing any inconsistencies in the date values.


| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.6/dbs-v0.10.6-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.6/dbs-v0.10.6-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.6/dbs-v0.10.6-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.6/dbs-v0.10.6-linux-arm64.zip)   |



## Version 0.10.3


:calendar: February 14, 2024


### Features and Fixes

1. **Fix Parsing Time Field Types on Target**
   - Resolved issues related to [parsing time field types](https://github.com/slotix/dbconvert-streams-public/issues/23) on the target database, ensuring accurate data conversion.
   - [Issue #24: convert from MySQL YEAR field type to PostgreSQL ](https://github.com/slotix/dbconvert-streams-public/issues/23) has been resolved. 

1. **Fix Stream Stopping Issue with "Ghosted" Nodes**
   - Addressed a [critical issue](https://github.com/slotix/dbconvert-streams-public/issues/13) where the stream erroneously stopped when the target status was 'failed.' This fix ensures proper handling of failed targets and avoids the creation of ghost nodes that hinder subsequent stream initiation.

1. **Handle Error When Retrieving Stats from Nodes with No Active Stream**
   - Implemented error handling to manage situations where stats are retrieved from nodes without an active stream.

1. **Fix Full-Text Search Index Type Conversion from MySQL to Postgres**
   - Corrected the [conversion of full-text search index types from MySQL to Postgres](https://github.com/slotix/dbconvert-streams-public/issues/25), ensuring accurate and consistent indexing.

1. **Implement Options for Target Database**
   - Introduced options for the target database, offering enhanced control over behavior during data conversion and loading. Refer to the [target configuration](/targets/target-config) documentation for detailed descriptions of available options.

1. **Fix Data Races**
   - Addressed data race issues to enhance the stability and reliability of DBConvert Streams.

1. **Refactor Logger and Publish Log Messages to NATS Stream**
   - The logger has been refactored, and log messages are now can be published to NATS Stream.


Download the latest binaries from:

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.3/dbs-v0.10.3-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.3/dbs-v0.10.3-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.3/dbs-v0.10.3-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.10.3/dbs-v0.10.3-linux-arm64.zip)   |




## Version 0.9.1


:calendar: January 12, 2024


This release brings important improvements and bug fixes to enhance your experience with Postgres CDC (Change Data Capture). Below are the key highlights of this release:

### Features and Enhancements:

1. **Postgres CDC: Support for Version 2 Protocol**
   - In this release, we have introduced support for the Version 2 protocol for streaming large transactions in Postgres CDC. This enhancement ensures smoother and more efficient handling of substantial data changes, providing a more robust and reliable CDC experience.

### Bug Fixes:

1. **Postgres Source Reader in CDC Mode**
   - Addressed an issue where the Postgres source reader, when started in CDC mode, sometimes failed to detect incoming events. This bug has been fixed, ensuring that the CDC functionality now consistently captures and processes all relevant changes from the source.

Download the latest binaries from:

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.1/dbs-v0.9.1-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.1/dbs-v0.9.1-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.1/dbs-v0.9.1-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.1/dbs-v0.9.1-linux-arm64.zip)   |



## Version 0.9.0


:calendar: January 08, 2024


### Improvements

####  Publish Stop Status via NATS
- In this release, we've implemented a more efficient mechanism for handling stop status updates. Instead of directly calling services through the API endpoint, the stop status is now published via NATS. This not only resolves the issue with stopping current stream processing but also ensures a more reliable and real-time communication channel.


#### Simplify Functions for Streaming Databases
- We've streamlined the process of streaming data between MySQL and PostgreSQL databases. The functions for these operations have been simplified, making the overall experience more user-friendly and efficient.

#### Enhance Output from Statistics Endpoint
- The statistics endpoint has been enhanced to provide more accurate and real-time information. Service instances now report their states to NATS, and when the API polls these instances, the information is retrieved in a structured JSON format. This improvement ensures a dynamic and responsive system for better monitoring and analysis.
  - Find more information about this enhancement at [GitHub Issue #18](https://github.com/slotix/dbconvert-streams-public/issues/18).

### Bug Fixes

- Fixed an issue with stopping current stream processing from the API endpoint. (Issue #13)
  - This bug was reported and addressed in [GitHub Issue #13](https://github.com/slotix/dbconvert-streams-public/issues/13).


Download the latest binaries from:

| Operating System | Architecture | Link                                                                                |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.0/dbs-v0.9.0-linux-amd64.zip)   |
| Mac OS X         | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.0/dbs-v0.9.0-darwin-amd64.zip)  |
| Windows          | AMD64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.0/dbs-v0.9.0-windows-amd64.zip) |
| Linux            | ARM64        | [Download](https://dbconvert.com/downloads/dbs/v0.9.0/dbs-v0.9.0-linux-arm64.zip)   |
