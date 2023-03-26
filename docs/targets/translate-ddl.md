---
title: Conversion of table structures between source and target databases.
description: Translate DDL Create Table. Create table structure on targets.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBConvert Streams supports heterogeneous data migration, allowing you to migrate data between source and target databases that are not the same type. 

The tool automatically selects the closest available data types in the target database, ensuring that data is loaded most efficiently
The database and schema specified in the stream target configuration are automatically created when a stream starts.

DBConvert Streams can convert `CREATE Table` DDL statements between different dialects, eliminating the need for manual type conversion between MySQL and Postgres databases. The software creates corresponding tables with the same structure in the target database for each table specified in the source database configuration.
