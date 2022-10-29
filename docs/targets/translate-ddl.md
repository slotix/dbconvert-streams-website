---
title: Conversion of table structures between source and target databases.
description: Translate DDL Create Table. Create table structure on targets.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

The database and schema specified in the target configuration must exist in the target database.

Before moving actual data from the source to the target, you must have mapped tables with the same structures in both the source and destination databases.

DBConvert Stream is able to convert the `CREATE Table` DDL statements between various dialects. Thus, there is no need to worry about manual type conversion between MySQL and Postgres databases. For every table in the source database specified in the configuration, DBConvert Stream creates a corresponded tables with the same structure in the target database.

