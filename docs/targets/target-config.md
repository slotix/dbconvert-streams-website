---
title: Target configuration.
description: Configure targets for DBConvert Streams.
layout: doc
lastUpdated: true
---

# Target configuration.

A target is any database or data store to which you want to replicate your data. You can create multiple streams that write data to the same target.

You must set up a target so that our connectors can sync data from your sources.

This section contains general information about target configuration options. Find specific configuration options for different target types in the relevant sections.

Here is an example of JSON config object describing a target.

```json
"target": {
    "type": "target-type",
    "connection": "connection-string",
    "options": {
      "noCreateTables": true,
      "tables": [
        {
          "name": "table-name",
          "noCreateIndexes": true
        }
      ]
    },
    "reportingInterval": 5
  }
```

| property   | type   | description                                            |
| ---------- | ------ | ------------------------------------------------------ |
| type       | string | Target type. It can be either `mysql` or `postgresql`. |
| connection | string | Connection parameters.                                 |
| options |object  | the "options" object is used to specify the options for the target database.                         |
| noCreateTables | boolean | If set to `true`, tables will not be created on target. By default, if omitted or set to `false`, all source table structures are created on the target. |
| tables | array | An array of table-specific options. |
| name | string | table name |
| noCreateIndexes | boolean | If set to `true`, indexes for  the specified table (`table-name`) will not be created on target. By default, if omitted or set to `false`, all indexes for the specified table (`table-name`) are created on the target.|
| reportingInterval |(in seconds).| It allows users to define the frequency at which progress reports are generated to keep users informed about the status of data transfer.  If `reportingInterval` is set to zero or omitted, no statistics will be returned while the stream is running, providing flexibility for silent operation.     |
