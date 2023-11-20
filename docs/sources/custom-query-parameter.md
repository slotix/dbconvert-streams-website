---
title: Custom SQL Queries.
description: Customize SQL Select queries for each table, including conditions, ordering, limiting.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The Custom SQL Queries feature in DBConvert Streams provides users with greater control over data retrieval from source database tables. This powerful functionality enhances the flexibility and customization options for tailoring data extraction to specific requirements.


Users can specify custom SQL queries for individual tables within the filter section.
Customize queries for each table by incorporating conditions, ordering, limiting, and more.

Fine-tune data extraction based on precise criteria.

## Configuration Example

```json
{
  "source": {
    "type": "mysql",
    "mode": "convert",
    "connection": "root:123456@tcp(0.0.0.0:3306)/source",
    "dataBundleSize": 100,
    "reportingInterval": 5,
    "filter": {
      "tables": [
        {
          "name": "products",
          "query": "SELECT * FROM products LIMIT 3000000 OFFSET 100000"
        },
        {
          "name": "another_table",
          "query": "SELECT * FROM another_table WHERE storage > 10 LIMIT 3042"
        }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@0.0.0.0:5432/postgres",
    "reportingInterval": 5
  }
}
```
