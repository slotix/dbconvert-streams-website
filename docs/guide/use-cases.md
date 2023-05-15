---
title: Use cases.
description: What are the typical cases for DBConvert Streams?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## What are the typical use cases for DBConvert Streams CDC Replication and Sync?

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

## Use Cases for Converting Between Different Types of Databases.
The use cases of conversion between different types of databases are varied and often depend on the specific needs of the individual or organization. Here are some common scenarios where database conversion may be required:

1. **Migrating to a new database platform:** When an organization switches to a new one, database conversion is necessary to ensure the data is transferred and stored correctly in the new system. Typically it is particularly challenging as the new database platform uses a different data model and syntax.

1. **Consolidating databases:** In some cases, organizations may need to consolidate multiple databases into a single platform to improve efficiency, reduce costs, or simplify data management. Database conversion can help in this process by transferring data from different types of databases into a single, unified format.

1. **Upgrading existing databases:** As technology evolves, databases become outdated and must be upgraded. 

1. **Integrating data from multiple sources:** Organizations must often integrate data from various sources, including databases with different types and formats. Database conversion can help in this process by transforming data into a consistent format that can be used for analysis and reporting.

1. **Cross-platform data access:** In some cases, organizations may need to access data stored in different types of databases across different platforms. Database conversion can help in this process by providing a standardized way to access data across different platforms and databases.
