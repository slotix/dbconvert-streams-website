---
title: How it works?
description: How DBConvert Streams works?
layout: doc
lastUpdated: true
---

# How it works?

## Collecting data

The first step in using DBConvert Streams is connecting to a source database and reading the data.

There are two modes of reading source database avaiable in DBConvert Streams.

- _[Data Migration (Conversion) mode.](/sources/conversion-mode)_ This mode is typically used to initially copy data from a source database to a target database.
- _[CDC (change data capture)](/sources/what-is-cdc) mode._ The source database reader captures incremental changes in CDC (Change Data Collection) mode.

### Differences between reading modes.

| Features        | CDC Mode                                                     | Data Migration Mode                                  |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| Event Types     | Insert, Update, Delete                                       | Insert                                           |
| Event Order     | Events are captured in order of occurrence                   | Insert events can be sent without strict order   |
| Data Source     | BinLog/WAL log files                                         | Directly from tables                             |
| Source Database | Requires special setup for enabling CDC reading capabilities | No special requirements on source database setup |



Data chunks collected from the source are swiftly dispatched to the Event Hub for publication. Subsequently, DBS target writers transmit the data to the target database. This ensures that the target database can access new data even before the entire dataset is fully ingested from the source database.


## Processing data

### Automatic DDL translation between SQL dialects

DBConvert Streams automates the translation of DDL `CREATE TABLE` statements between MySQL and PostgreSQL, eliminating the need for manual data type conversion. When a corresponding table is not found in the target database, the source's `CREATE TABLE` statement is translated into the appropriate target database dialect, creating a new table in the target database.

Additionally, indexes and foreign keys are seamlessly converted from the source to the target, ensuring a comprehensive migration process.

### Consistency and Concurrency

Consistency in a distributed system is no longer natural, and horizontal scaling becomes more difficult.
DBS executes the SQL `UPDATE` and `DELETE` statements sequentially in the order they come from the transaction log.

Several neighboring `INSERT` statements are bundled and executed simultaneously, significantly speeding up the whole process.

In both CDC and Conversion modes, the DBConvert Streams transfer process incorporates slicing techniques and data chunks to optimize speed and efficiency. Smaller manageable portions are processed and migrated individually, allowing for parallel execution and improved performance. This approach ensures faster and more reliable data migration between on-premises or cloud databases, especially when dealing with large volumes of data.


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

## Workflow.

1. The reader component retrieves the meta-structure of tables and indexes from the source database.
1. The retrieved meta structures is then forwarded to NATS, which serves as a messaging system for communication between components.
1. Among the available target writers, a specific one is chosen to handle the execution of `CREATE TABLE`, `CREATE INDEX` DDL statements on the target Database.
1. The chosen target writer begins the process of translating DDLs and attempts to create the corresponding structure on the target database. During this phase, the other target writers remain inactive and wait until the structure creation process is completed.
1. Once the `CREATE TABLE`, `CREATE INDEX` DDLs have been successfully executed, indicating that the table structures have been created on the target database, the chosen target writer notifies the other target writers that they can proceed with receiving data.
1. The data transfer process involves fetching data from the source database in batches to optimize performance and reduce resource consumption. The size of each batch can be configurable based on factors such as network latency, database load, and available system resources.
1. Throughout the data transfer process, comprehensive logging and monitoring mechanisms are in place to track the progress, identify any errors or anomalies, and ensure timely resolution.
1. Once all data has been successfully transferred to the target database, the target writers send a completion notification indicating that the data transfer process is finished.

## Metrics.

The DBS platform collects its internal metrics in Prometheus format to explore and visualize live data in dashboards.

## Install & Run.

There are different ways to install and run DBConvert Streams:

- [Run DBS Docker containers.](/guide/dbs-docker)
- [Deploy DBS to Amazon EC2](/guide/deploy-ec2)
- [DBConvert Streams Configurations and examples.](https://github.com/slotix/dbconvert-streams-public)
- [Install from a Zip archive. Run DBS Binaries.](/guide/install)

Follow the instructions in the following sections to get started using DBConvert Streams.
