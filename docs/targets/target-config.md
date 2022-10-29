---
title: Target configuration.
description: Configure targets for DBConvert Stream.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

A Target is any database or data warehouse to which you want to replicate your data. You can create multiple Streams with the same Target. You can also replicate data from multiple Sources into the same Target.

You must configure a target so that our connectors can sync data into it from your sources.

In this section general information about target configuration options will be provided. Some specific configuration options for different target types will be described in corresponding sections.

Here is an example JSON configuration object.

```JSON
"target": {
    "type": "target-type",
    "connection": "connection-string"
  }
```

| property       | type | description                                                                                            |
|----------------|-------------------------|-------------------------------------------------------------------------------------------------------|
| type           | string | Target type. It can be either mysql or postgresql.                                                                  |
| connection     | string | Connection parameters.                                                                                 |



