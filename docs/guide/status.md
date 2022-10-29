---
title: Statuses.
description: Source Reader and Target writer statuses.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

## Source Reader Statuses.

DBConvert Stream may assign the following _source reader statuses_ to Stream objects informing of the progress and any action that you may need to take:
| Status   | Description                                                                                 |
|----------|---------------------------------------------------------------------------------------------|
| READY    | Stream is initialized and Source reader is ready to start ingesting events from the source. |
| RUNNING  | The Events (Records) are being actively ingested by the Source reader.                      |
| FINISHED | The ingestion has reached a specified stream limit.                                         |
| STOPPED  | The stream has stopped and source reader is no longer collects events from the source.      |
| INIT FAILED   | There was an error while initializing source database                                |


## Target writer statuses.

DBConvert Stream may assign the following _target writer statuses_ to Stream objects informing you of the progress and any action that you may need to take:
| Status   | Description                                                                                                                        |
|----------|------------------------------------------------------------------------------------------------------------------------------------|
| READY    | Stream is initialized and Target writer is ready to start consuming events from the event hub and write them to specified targets. |
| RUNNING  | The Events (Records) are being actively loaded to targets.                                                                         |
| FINISHED | The loading of events has reached a specified stream limit.                                                                        |
| STOPPED  | The stream has stopped and target writer is no longer consumes events from the event hub.                                          |
| INIT FAILED    | There was an error while initializing target database.                                                                         |