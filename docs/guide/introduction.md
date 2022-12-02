---
title: Introduction.
description: What is DBConvert Streams?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

This documentation introduces **DBConvert Streams**, also known as **DBS**, to new and prospective users.

## What is DBConvert Streams?

![high-level diagram of DBConvert Streams architecture](/images/dbconvert-stream-high-level-diagram.png)

DBConvert Streams is a set of distributed services that capture row-level changes in a source database, allowing your applications to respond to those data changes with very low latency.

DBS collects data from and deliver data _continuously_ to SQL and no-SQL databases, data warehouses, and files on your premises or in a cloud.

The DBS platform collects its internal metrics in Prometheus format to explore and visualize live data in dashboards.

## What are the typical use cases for DBConvert Streams?

The main goal of DBS is to allow applications to respond almost instantly when data in monitored databases changes. Applications can do whatever they want with the collected `INSERT,` `UPDATE,` and `DELETE` events.

1. Replicate data and synchronize information in data stores.
1. Move changed data elsewhere, even copy data between different database types.
1. Create derived views and data.
1. Compute new data from collected events.
1. Aggregate changes within windows and create new data.
1. Propagate data between microservices using the transactional outbox pattern.
1. Clear the cache of obsolete entries.
1. Update search indexes with new data.
1. Send push notifications to mobile devices when data changes.

---

Review the sections in the documentation to familiarize yourself with DBConvert Streams and understand its functionality for seamless data replication.

Please [drop us a message](mailto:streams@dbconvert.com) for any clarification or report any documentation error. We eagerly seek your feedback to improve the content of this site.
