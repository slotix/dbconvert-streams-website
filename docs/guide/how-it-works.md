---
title: How it works?
description: How DBConvert Streams works?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## What is Change Data Capture (CDC)?

Change Data Capture, or CDC, is a system that monitors and captures data changes in a database so that other software can respond to those changes.

DBConvert Stream is a modern, distributed change data capture platform that continuously monitors various database systems and allows other applications to use the collected data.

To make _Change Data Capture (CDC)_ possible, we must read the database transaction log and get change events from there. Unfortunately, there is no single API or universal way to do this for all databases. Each database stores transaction logs differently.

> How to read Postgres WAL logs and get changes from a Postgres database?  
> How to get them from MySQL Binlog files?

DBConvert Streams knows how to get data changes from those different databases and other types of sources. DBS then generates generic change events for use by target consumers.

## Collecting data

_DBS Database Readers_ don't have to wait for a database to entirely ingest and index new data before reading it.

DBConvert Streams uses a technology known as _Change Data Capture (CDC)_ to capture a row-level stream of **Insert, Update, and Delete events** from a database's transaction log and publish it to an **Event Hub**.

![Transaction Log Change Data Capture](/images/log-cdc.png)

DBConvert Streams currently supports the following sources:

- MySQL Binlog or MariaDB Binlog
- Amazon RDS for MySQL
- Amazon Aurora (MySQL Compatible)
- PostgreSQL WAL or CockroachDB WAL
- Amazon RDS for PostgreSQL
- Amazon Aurora (PostgreSQL Compatible)

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
- [Deploy DBS to Amazon EC2](/guide/deploy-ec2)
- [DBConvert Streams Configurations and examples.](https://github.com/slotix/dbconvert-streams-public)
- [Install from a Zip archive. Run DBS Binaries.](/guide/install)

Follow the instructions in the following sections to get started using DBConvert Streams.
