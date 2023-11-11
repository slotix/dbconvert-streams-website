---
title: How it works?
description: How DBConvert Streams works?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Collecting data

The first step in using DBConvert Streams is connecting to a source database and reading the data. DBConvert Streams offers two modes for reading source databases: CDC (change data capture) mode and Conversion mode.

There are two modes of reading source database avaiable in DBConvert Streams.

- _[Conversion mode.](/sources/conversion-mode)_ Conversion mode is typically used to initially copy data from a source database to a target database.
- _[CDC (change data capture)](/sources/what-is-cdc) mode._ The source database reader captures incremental changes in CDC (Change Data Collection) mode.

### Differences between reading modes.

| Features        | CDC Mode                                                     | Conversion Mode                                  |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| Event Types     | Insert, Update, Delete                                       | Insert                                           |
| Event Order     | Events are captured in order of occurrence                   | Insert events can be sent without strict order   |
| Data Source     | BinLog/WAL log files                                         | Directly from tables                             |
| Source Database | Requires special setup for enabling CDC reading capabilities | No special requirements on source database setup |


Data chunks collected from the source are immediately published to the Event Hub. Readers of a DBConvert Streams database can read it before the entire database is ingested and indexed.



## Processing data

### Translation of "CREATE Table" DDL between SQL dialects

DBConvert Streams automates the translation of DDL `CREATE TABLE` statements between MySQL and PostgreSQL, eliminating the need for manual data type conversion. When a corresponding table is not found in the target database, the source's `CREATE TABLE` statement is translated into the appropriate target database dialect, creating a new table in the target database.

Additionally, indexes and foreign keys are seamlessly converted from the source to the target, ensuring a comprehensive migration process.

### Consistency and Concurrency

Consistency in a distributed system is no longer natural, and horizontal scaling becomes more difficult.
DBS executes the SQL `UPDATE` and `DELETE` statements sequentially in the order they come from the transaction log.

Several neighboring `INSERT` statements are bundled and executed simultaneously, significantly speeding up the whole process.

In both CDC and Conversion modes, the DBConvert Streams transfer process incorporates slicing techniques and data chunks to optimize speed and efficiency. Smaller manageable portions are processed and migrated individually, allowing for parallel execution and improved performance. This approach ensures faster and more reliable data migration between on-premises or cloud databases, especially when dealing with large volumes of data.


::: info
Replicating One Million INSERT statements takes from 3 seconds.
:::

## Delivering data

In addition to receiving new events from sources, _Event Hub_ simultaneously delivers a stream of data to all consumers (targets) that have subscribed to the current job (stream).

The _DBS Writer_ can continuously deliver data to MySQL or Postgres target databases.

### Horizontal Scaling of services

DBConvert Streams has been architected from the ground up to scale.
Running multiple DBS Writers at the same time improves overall performance by several times.

To define and configure source and target, you can use a simple set of properties in `JSON` format.

```JSON
{
  "source": {
    "type": "mysql",
    "mode": "cdc",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/source",
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination"
  }
}
```

## Metrics.

The DBS platform collects its internal metrics in Prometheus format to explore and visualize live data in dashboards.

## Install & Run.

There are different ways to install and run DBConvert Streams:

- [Run DBS Docker containers.](/guide/dbs-docker)
- [Deploy DBS to Amazon EC2](/guide/deploy-ec2)
- [DBConvert Streams Configurations and examples.](https://github.com/slotix/dbconvert-streams-public)
- [Install from a Zip archive. Run DBS Binaries.](/guide/install)

Follow the instructions in the following sections to get started using DBConvert Streams.
