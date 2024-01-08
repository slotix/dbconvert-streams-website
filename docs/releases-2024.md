---
title: DBConvert Streams releases in 2024.
description: DBConvert Streams latest releases page with download links.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}


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
