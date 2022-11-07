---
title: Statuses.
description: Source Reader and Target writer statuses.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Source Reader Statuses

DBS may assign the following _source read statuses_ to stream objects, informing you of progress and any action taken:

| Status      | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| READY       | stream is initialized, and the Source reader is ready to start receiving events from the source. |
| RUNNING     | The source reader actively receives Events (records).                                            |
| FINISHED    | The ingestion has reached the specified stream limit.                                            |
| STOPPED     | The stream has stopped, and the source reader is no longer collecting events from the source.    |
| INIT FAILED | An error occurred while initializing the source database                                         |

## Target writer statuses

DBS may assign the following _target read statuses_ to stream objects, informing you of progress and any action taken:

| Status      | Description                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| READY       | stream is initialized, and the Target writer is ready to start receiving events from the Event Hub and writing them to the specified targets. |
| RUNNING     | Events (Records) are actively loaded into targets.                                                                                            |
| FINISHED    | The loading of events has reached a specified stream limit.                                                                                   |
| STOPPED     | The stream has stopped, and the target writer is no longer consuming events from the Event Hub.                                               |
| INIT FAILED | An error occurred while initializing the target database                                                                                      |
