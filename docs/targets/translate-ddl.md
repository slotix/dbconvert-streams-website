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

-- 

By default, all source table structures and indexes are created on the target database, but it is possible to skip this step using the "options" configuration.

The "options" configuration provides more control over the target database behavior when converting and loading data from the source to the target database. It allows for fine-grained control over the target behavior during structure creation, such as specifying whether tables should be created in the target database and defining table-specific options, like "noCreateIndexes" for the specified table.

```json
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/postgres",
    "options": {
      "tables": [
        {
          "name": "products",
          "noCreateIndexes": true
        }
      ]
    }
  }

```

See desctription of options in the [target configuration](/targets/target-config) section.
