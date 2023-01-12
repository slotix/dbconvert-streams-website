---
title: Conversion of table structures between source and target databases.
description: Translate DDL Create Table. Create table structure on targets.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The database and schema specified in the stream target configuration are automatically created when a stream starts.

Before transferring actual data from the source database to the target, tables with the same structures must be mapped in both the source and destination databases.

DBConvert Streams can convert `CREATE Table` DDL statements between different dialects, eliminating the need for manual type conversion between MySQL and Postgres databases. The software creates corresponding tables with the same structure in the target database for each table specified in the source database configuration.
