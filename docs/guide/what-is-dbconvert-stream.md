---
title: What is DBConvert Stream?
description: What is DBConvert Stream data replication platform?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}


This section of documentation provides an introduction to the DBConvert Stream for new and prospective users.

![high-level diagram of DBConvert Stream architecture](/images/dbconvert-stream-high-level-diagram.png)

DBConvert Stream is a data integration and streaming distributed platform to replicate data between databases. 

Database connection adapters collect data from and deliver data **continuously** to SQL and no-SQL databases, data warehouses, files on your premises or in the cloud. 

DBConvert Stream platform outputs its internal metrics in Prometheus format to explore and visualize live data in dashboards.


## Collecting data

DBConvert Stream's *Database Readers* don't have to wait for a database to completely ingest and index new data before reading it.

DBConvert Stream uses technology known as Change Data Capture (CDC) to capture row-level stream of **Insert, Update, and Delete Events** from the database transaction log and publishes it to the **Event Hub**.


![Transaction Log Change Data Capture](/images/log-cdc.png)


DBConvert Stream currently supports the following sources:

- MySQL Binlog or MariaDB Binlog
- PostgreSQL WAL or CockroachDB WAL

Sources are defined and configured via a simple set of properties in `JSON` format. 


## Processing data

### "CREATE Table" Translation between SQL dialects

DBConvert Stream can automatically convert the `CREATE Table` DDL statements between MySQL and PostgreSQL. Thus, there is no need to worry about manual type conversion of MySQL and Postgres databases. If the target does not have a corresponded table, the original structure will be translated into the appropriate dialect and the new table will be created on the target.


### Consistency and Concurrency
Consistency in distributed system is no longer natural, and horizontal scaling becomes more difficult. 
DBConvert Stream executes the `UPDATE` and `DELETE` SQL statements sequentially in the exact order they arrive from the transaction log.

Multiple neighbour INSERT statements are executed simultaneously, greatly speeding up the whole process.

::: info
Replicating INSERT statements for One Million rows takes about 12 seconds. 
:::


## Delivering data

Along with getting new events from the sources, Event Hub delivers a data stream to all consumers (destinations) simultaneously, subscribed to the current job.
DBConvert Stream can write continuously to either MySQL or Postgres target databases.

### Horizontal Scaling of services.
Running multiple instances of "destination processing service", improves overall performance in times.

Destinations are defined and configured via a simple set of properties in `JSON` format. 


DBConvert Stream has been architected from the ground up to scale.



Follow the instructions in [Install DBConvert Stream Platform.](/guide/install)