---
title: DBConvert Streams releases.
description: DBConvert Streams latest releases page with download links.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Version 0.5.1

:calendar: December 18, 2022

Maintaining database consistency in today's distributed systems has become more complex than it used to be in legacy applications.  
The best way to speed up the data replication process is to combine multiple INSERT statements from the source database into groups and send them to the destinations concurrently.

There have been test cases with Postgres databases where the INSERT batches arrive before the table is actually created on the target. To avoid such situations, all table structures on destinations are now always created before any INSERT, UPDATE and DELETE statements.

[A sample docker-compose file for starting DBConvert Streams](https://github.com/slotix/dbconvert-streams-public/blob/be59cabcda3f3ccb340bdb8b40b5cfb31b1917ab/docker-compose.yml).

Or binaries for different OS are available, choose the one suitable for your platform from the links below.

| Operating System | Architecture | Size     | Link                                                                                |
| ---------------- | ------------ | -------- | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | 15.13 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-linux-amd64.zip)   |
| Mac OS X         | AMD64        | 15.76 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-darwin-amd64.zip)  |
| Windows          | AMD64        | 15.3 MB  | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-windows-amd64.zip) |
| Linux            | ARM64        | 13.75 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.1/dbs-v0.5.1-linux-arm64.zip)   |

## Version 0.5.0

:calendar: November 22, 2022

We are excited to announce the release of DBConvert Streams 0.5.0!
This if the first public release of DBS that replicates data between MySQL and PostgreSQL.

The easiest way to get started with DBConvert Streams is to use the [docker-compose configuration file](https://github.com/slotix/dbconvert-streams-public/blob/be59cabcda3f3ccb340bdb8b40b5cfb31b1917ab/docker-compose.yml).

If you prefer install binaries, choose the right release archive for your platform from the download links below.

| Operating System | Architecture | Size    | Link                                                                                |
| ---------------- | ------------ | ------- | ----------------------------------------------------------------------------------- |
| Linux            | AMD64        | 15.1 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-linux-amd64.zip)   |
| Mac OS X         | AMD64        | 15.8 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-darwin-amd64.zip)  |
| Windows          | AMD64        | 15.3 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-windows-amd64.zip) |
| Linux            | ARM64        | 13.7 MB | [Download](https://dbconvert.com/downloads/dbs/v0.5.0/dbs-v0.5.0-linux-arm64.zip)   |
