---
title: How it works?
description: How DBConvert Streams works?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Collecting data

_DBS Database Readers_ don't have to wait for a database to entirely ingest and index new data before reading it.

DBConvert Streams uses a technology known as _Change Data Capture (CDC)_ to capture a row-level stream of **Insert, Update, and Delete events** from a database's transaction log and publish it to an **Event Hub**.

![Transaction Log Change Data Capture](/images/log-cdc.png)

DBConvert Streams currently supports the following sources:

- MySQL Binlog or MariaDB Binlog
- PostgreSQL WAL or CockroachDB WAL

Sources are defined and configured using a simple set of properties in `JSON` format.

## Processing data

### Translation of "CREATE Table" DDL between SQL dialects

DBConvert Streams can automatically convert DDL `CREATE Table` statements between MySQL and PostgreSQL. Thus, there is no need to worry about manual type conversion of MySQL and Postgres databases.

If there is no corresponding table in the target, the source structure will be translated into the appropriate dialect, and then a new table will be created in the target.

### Consistency and Concurrency

Consistency in a distributed system is no longer natural, and horizontal scaling becomes more difficult.
DBS executes the SQL `UPDATE` and `DELETE` statements sequentially in the order they come from the transaction log.

Several neighboring INSERT statements are bundled and executed simultaneously, significantly speeding up the whole process.

::: info
Replicating One Million INSERT statements takes about 12 seconds.
:::

## Delivering data

In addition to receiving new events from sources, _Event Hub_ simultaneously delivers a stream of data to all consumers (destinations) that have subscribed to the current job (stream).

The _DBS Writer_ can continuously deliver data to MySQL or Postgres target databases.

### Horizontal Scaling of services

Running multiple DBS Writers at the same time improves overall performance by several times.

Destinations are defined and configured using a simple set of properties in `JSON` format.

DBConvert Streams has been architected from the ground up to scale.

## Install & Run.

There are different ways to install and run DBConvert Streams:

- [Run DBS Docker containers.](/guide/dbs-docker)
- [Install from a Zip archive. Run DBS Binaries.](/guide/install).

Follow the instructions in the following sections to get started using DBConvert Streams.
