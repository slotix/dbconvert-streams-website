---
title: Convert mode.
description: What is convert mode?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

"Convert" mode in DBConvert Streams focuses on transferring data between
databases by reading records directly from the source database tables. Every
type of database has its unique structure, and there is no universal approach
for seamless data transfer.

When operating in conversion mode, DBConvert Streams automates the stages of
reading data from the source tables. It handles the intricacies and variations
of each database system, ensuring that the data is extracted accurately and
efficiently.

By leveraging its intelligent algorithms, DBConvert Streams facilitates the
conversion process, mapping data types, transforming schemas, and handling
necessary data manipulations to ensure compatibility between the source and
target databases.

DBConvert Streams eliminates the burden of manual data extraction and
transformation. Instead, the platform takes care of these tasks, providing a
streamlined and automated solution for transferring data between diverse
database systems.

## Supported Source Database Types.

DBConvert Streams currently supports the following sources:

- MySQL/ MariaDB
- Amazon RDS for MySQL
- Amazon Aurora (MySQL Compatible)
- PostgreSQL/ CockroachDB
- Amazon RDS for PostgreSQL
- Amazon Aurora (PostgreSQL Compatible)

:::info Sources are defined and configured using a simple set of properties in
JSON format. In the source section, the `mode` parameter should be set to
_"convert"_ to enable conversion functionality.

```json
"source": {
    "mode":"convert",
    "type": "mysql",
    "connection": "root:123456@tcp(0.0.0.0:3306)/source"
}
```

:::
