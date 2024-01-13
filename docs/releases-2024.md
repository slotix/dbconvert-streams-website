---
title: DBConvert Streams releases in 2024.
description: DBConvert Streams latest releases page with download links.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}


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


Visit the [DBConvert Streams Docker Guide](https://stream.dbconvert.com/guide/dbs-docker) for detailed instructions on setting up and running DBConvert Streams in a Docker environment.

We appreciate your ongoing feedback. Please don't hesitate to reach out if you encounter any issues or have suggestions for further improvements. Thank you for choosing DBConvert Streams!


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
