---
title: Use cases.
description: What are the typical cases for DBConvert Streams?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

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

