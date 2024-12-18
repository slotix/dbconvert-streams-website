---
title: DBConvert Streams FAQ.
description: Frequently asked questions.
layout: doc
lastUpdated: true
---

# DBConvert Streams FAQ.

Q: Can DBConvert Streams convert Postgres data between different operating systems?

A: Yes, DBConvert Streams allows you to establish remote connections to PostgreSQL servers running on both Windows and Linux. This means that you can set up a source connection pointing to a Windows-based Postgres server and a target connection pointing to a Linux-based Postgres server, and use DBConvert Streams to transfer data between the two. For example, you could use DBConvert Streams to migrate data from a Windows Postgres server to a Linux Postgres server, or vice versa.


## NATS errors.

Q: What does the "slow consumer, messages dropped" error in NATS indicate?

A: This error signifies that a consumer is struggling to keep up with the message flow from the NATS server, leading to message drops due to processing lag.

Q: How can I address the "slow consumer" issue when transferring fat rows with more data?

A: To alleviate this issue, consider setting up the `dataBundleSize` parameter in the stream configuration to optimize data bundle sizes during transmission, preventing errors related to slow consumers and dropped messages.

Q: Is the default setting sufficient for handling all types of data transfers?

A: While the default settings work well for regular tables, it's advisable to adjust parameters like `dataBundleSize` to lower values for tables with larger or "fat" records to ensure optimal performance and avoid errors associated with slow consumers.

Find more information about that in the related [NATS errors article](https://dbconvert.com/blog/nats-errors-dbconvert-streams/)

Q: I'm encountering an error:
```
[source] data size 2.0 MB exceeds max payload 1.0 MB
```
A: This error is likely occurring because records in the source table are too large. When transferring data between a source database and the target, data is combined from the source tables into bundles and then published to NATS. To resolve this issue, you can set the `dataBundleSize` parameter to a lower value.

If the problem persists even after adjusting the parameter value down to 1, modify the NATS configuration:
You need to increase the `max_payload` parameter in the NATS configuration to 8MB.
Find an example of [NATS configuration](https://github.com/slotix/dbconvert-streams-public/blob/main/examples-convert/mysql2postgres/10-million-records/nats/nats.conf) here. 


## PostreSQL.

Q: I received the following error after 30 minutes of inactivity on my Postgres connection: `"SendStandbyStatusUpdate failed: write failed: closed"`. How can I resolve this?

A: The error is likely occurring because there were no transactions in the source database, and the connection was closed due to inactivity. To resolve this issue, you can increase the `pool_max_conn_idle_time` runtime parameter for the Postgres connection.  
For example, you can specify a connection string such as `postgres://postgres:passw0rd@pghost.com:5432/mydb?pool_max_conn_idle_time=10h`, which sets the maximum idle time to 10 hours. This should prevent the connection from being closed due to inactivity."

Q: I'm facing a problem while attempting to transfer  40 million records. The data transfer unexpectedly stops after reaching:

```
Number of events: 16304000, Total data size: 48.4 GB,
```

Upon inspecting the PostgreSQL logs, the following errors are reported: 
```
2023-11-16 19:06:33.963 UTC [875] LOG:  checkpoints are occurring too frequently (29 seconds apart)
2023-11-16 19:06:33.963 UTC [875] HINT:  Consider increasing the configuration parameter "max_wal_size".
```

A: You should either increase the value of `max_wal_size` or modify the `checkpoint_timeout` configuration parameters in your `postgresql.conf` to better suit your system's needs. This adjustment can help manage the generation and retention of WAL files.


## MySQL.

Q: I received a MySQL `error 1049` when trying to connect to the database.
 
A: Let's say you want to connect to the database called `my_database`, and your DSN includes the database name like this:

```
user:password@tcp(localhost:3306)/my_database
```

The MySQL `error 1049` may occur when the database specified in the connection string aka DSN (Data Source Name) does not exist. 

To avoid this error, you need to leave the database name out of the DSN when connecting to non-existing database. The DSN should only include the connection details (e.g., user, password, host, port), like this:

```
user:password@tcp(localhost:3306)/
```

The new database can then be created using a SQL `CREATE DATABASE` statement, and the connection string can be updated to include the database name: `user:password@tcp(localhost:3306)/my_database`.

> DBConvert Streams handle MySQL `error 1049`. It will automatically create a database on the target if it does not already exist.  
