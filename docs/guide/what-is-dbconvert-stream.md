---
title: What is DBConvert Stream?
description: What is DBConvert Stream data replication platform?
layout: doc
lastUpdated: true
---





# {{ $frontmatter.title }}

This documentation section introduces **DBConvert Stream**, also known as **DBS**, to new and prospective users.

![high-level diagram of DBConvert Stream architecture](/images/dbconvert-stream-high-level-diagram.png)

DBConvert Stream is a distributed data integration and streaming platform for data replication between databases.

Database connection adapters collect data from and deliver data **continuously** to SQL and no-SQL databases, data warehouses, and files on your premises or in the clrud.

The DBS platform displays its internal metrics in Prometheus format to explore and visualize live data in dashboards.

## Collecting data

*DBS Database Readers* don't have to wait for a database to entirely ingest and index new data before reading it.

DBConvert Stream uses a technology known as *Change Data Capture (CDC)* to capture a row-level stream of **Insert, Update, and Delete events** from a database's transaction log and publish it to an **Event Hub**.

![Transaction Log Change Data Capture](/images/log-cdc.png)

DBConvert Stream currently supports the following sources:

- MySQL Binlog or MariaDB Binlog
- PostgreSQL WAL or CockroachDB WAL

Sources are defined and configured using a simple set of properties in `JSON` format.

## Processing data

### Translation of "CREATE Table" DDL between SQL dialects

DBConvert Stream can automatically convert DDL `CREATE Table` statements between MySQL and PostgreSQL. Thus, there is no need to worry about manual type conversion of MySQL and Postgres databases.

If there is no corresponding table in the target, the source structure will be translated into the appropriate dialect, and then a new table will be created in the target.

### Consistency and Concurrency

Consistency in a distributed system is no longer natural, and horizontal scaling becomes more difficult.
DBS executes the SQL `UPDATE` and `DELETE` statements sequentially in the order they come from the transaction log.

Several neighboring INSERT statements are bundled and executed simultaneously, significantly speeding up the whole process.

::: info
Replicating One Million INSERT statements takes about 12 seconds.
:::

## Delivering data

In addition to receiving new events from sources, *Event Hub* simultaneously delivers a stream of data to all consumers (destinations) that have subscribed to the current job (stream).

The *DBS Writer* can continuously deliver data to MySQL or Postgres target databases.

### Horizontal Scaling of services

Running multiple DBS Writers at the same time improves overall performance by several times.

Destinations are defined and configured using a simple set of properties in `JSON` format.

DBConvert Stream has been architected from the ground up to scale.

The very first step is to deploy/install DBS. Follow the instructions in [Installing DBConvert Stream.](/guide/install)
