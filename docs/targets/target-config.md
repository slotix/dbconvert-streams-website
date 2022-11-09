---
title: Target configuration.
description: Configure targets for DBConvert Stream.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

A target is any database or data store to which you want to replicate your data. You can create multiple streams that write data to the same target.

You must set up a target so that our connectors can sync data from your sources.

This section contains general information about target configuration options. Find specific configuration options for different target types in the relevant sections.

Here is an example of JSON config object describing a target.

```JSON
"target": {
    "type": "target-type",
    "connection": "connection-string"
  }
```

| property   | type   | description                                            |
| ---------- | ------ | ------------------------------------------------------ |
| type       | string | Target type. It can be either `mysql` or `postgresql`. |
| connection | string | Connection parameters.                                 |
