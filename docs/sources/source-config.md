---
title: Source configuration.
description: Configure sources for DBConvert Stream.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

DBConvert Stream readers collects data from external sources such as MySQL, PostgreSQL and writes collected events to a Target system of your choice.

In this section general information about source configuration options is provided. Some specific configuration options for different sources types are described in corresponding sections.

Here is an example JSON configuration object.

```JSON
"source": {
    "type": "source-type",
    "connection": "connection-string",
    "settings": {
      //settings are unique for each source type
    },
    "filter": {
      "tables": [
        { "name": "table1", "operations": ["insert", "update", "delete"]},
        { "name": "table2", "operations": ["insert", "update", "delete"]}
      ]
    }
  }
```

| property       | type | description                                                                                            |
|----------------|-------------------------|-------------------------------------------------------------------------------------------------------|
| type           | string | Source type. It can be either mysql or postgresql.                                                                  |
| connection     | string | Connection parameters.                                                                                 |
| settings       | - | Settings are unique for each source type. More information about settings can be found in corresponded documentation sections. |
| filter/ tables | object | The table(s) for which to return change data. Tables must have primary keys (required for logical replication).       |
| operations | enum | Set of Change Data Capture types ("insert", "update", "delete") of events to track. |





