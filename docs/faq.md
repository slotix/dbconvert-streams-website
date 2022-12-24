---
title: DBConvert Streams FAQ.
description: Frequently asked questions.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

:question: Can DBConvert Streams convert Postgres data between different operating systems?

:heavy_check_mark: Yes, DBConvert Streams allows you to establish remote connections to PostgreSQL servers running on both Windows and Linux. This means that you can set up a source connection pointing to a Windows-based Postgres server and a target connection pointing to a Linux-based Postgres server, and use DBConvert Streams to transfer data between the two. For example, you could use DBConvert Streams to migrate data from a Windows Postgres server to a Linux Postgres server, or vice versa.

## PostreSQL.

:question: I received the following error after 30 minutes of inactivity on my Postgres connection: `"SendStandbyStatusUpdate failed: write failed: closed"`. How can I resolve this?

:heavy_check_mark: The error is likely occurring because there were no transactions in the source database, and the connection was closed due to inactivity. To resolve this issue, you can increase the `pool_max_conn_idle_time` runtime parameter for the Postgres connection.  
For example, you can specify a connection string such as `postgres://postgres:passw0rd@postgres.host.com:5432/mydb?pool_max_conn_idle_time=10h`, which sets the maximum idle time to 10 hours. This should prevent the connection from being closed due to inactivity."
