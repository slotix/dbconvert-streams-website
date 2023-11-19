---
title: Source configuration.
description: Configure sources for DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBS readers collect data from external sources such as MySQL and PostgreSQL and
write the collected events to the target system of your choice.

This section provides general information about source configuration options.
Some specific configuration options for different source types are described in
the relevant sections.

Here is an example of a JSON source config object.

```json
"source": {
    "mode": "reader-mode",
    "type": "source-type",
    "connection": "connection-string",
    "dataBundleSize": 100,
    "reportingInterval": 5,
    "settings": {
      //settings are unique for each source type
    },
    "filter": {
      "tables": [
        { "name": "table1",
          "operations": ["insert", "update", "delete"],
          "query": "SELECT * FROM table1 LIMIT 10000 OFFSET 0"
        },
        { "name": "table2",
          "operations": ["insert", "update", "delete"]
        }
      ]
    }
  }
```

| property          | type                                                                                                                                                                                                                                                                                                              | description                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| mode              | source                                                                                                                                                                                                                                                                                                            | represent mode to read the source. It may be either _[cdc](/sources/what-is-cdc)_ or _[convert](/sources/conversion-mode)_                      |
| type              | string                                                                                                                                                                                                                                                                                                            | Source type. It can be either `mysql` or `postgresql`.                                                                                          |
| connection        | string                                                                                                                                                                                                                                                                                                            | Connection settings. See the relevant sections for specific data sources.                                                                       |
| dataBundleSize    | number                                                                                                                                                                                                                                                                                                            | helps prevent NATS errors related to slow consumers and dropped messages by optimizing the size of data bundles during transmission.            |
| reportingInterval | (in seconds). It allows users to define the frequency at which progress reports are generated to keep users informed about the status of data transfer. If `reportingInterval` is set to zero or omitted, no statistics will be returned while the stream is running, providing flexibility for silent operation. |                                                                                                                                                 |
| settings          | -                                                                                                                                                                                                                                                                                                                 | The settings are unique for each source type. Find more details about the settings in the relevant sections of the documentation.               |
| filter/ tables    | object                                                                                                                                                                                                                                                                                                            | Tables for which change data is returned. Tables must have primary keys (required for logical replication).                                     |
| name              | stream                                                                                                                                                                                                                                                                                                            | Name of table to be converted or replicated.                                                                                                    |
| operations        | enum                                                                                                                                                                                                                                                                                                              | A set of Change Data Capture types (insert, update, delete) of events to track.                                                                 |
| query             | string                                                                                                                                                                                                                                                                                                            | A custom SQL query to be executed against the source table. You can customize queries for each table, including conditions, ordering, limiting. |
