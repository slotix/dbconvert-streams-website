---
title: Life cycle and Statuses.
description: Life cycle of DBConvert Streams. Source Reader and Target writer statuses.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## Life cycle.

The DBConvert Streams service follows the life cycle:

1. The API waits for a new stream configuration for either data conversion or data streaming.
2. DBS starts the data conversion or replication process between the source and target. In the case of the CDC replication scenario, the process runs infinitely until one of the conditions described below is met.
3. The DBConvert Streams service stops collecting further events (records) depending on the following possible conditions:

- Conversion completed: All data from the source to the target has been successfully transferred.
- The process failed due to an error.
- The time limit or record transfer limit specified in the configuration has been reached.

## Statuses.

The stream objects in DBConvert Streams can be assigned various statuses, which can keep you informed about the progress of the process and any action taken.

| Status              | Description                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| READY               | A new task (stream) has been initialized, and the service API is waiting for the configuration to start the data conversion or streaming process.                           |
| RUNNING             | The service is currently converting or replicating data from the source to the target.                                                                                      |
| FINISHED            | The service has successfully completed the data conversion process.                                                                                                         |
| FAILED              | The service encountered an error during the data conversion or replication process, which caused the stream to stop working.                                                |
| TIME_LIMIT_REACHED  | The service has stopped the stream from working because the time limit set for the data conversion or replication process has been reached.                                 |
| EVENT_LIMIT_REACHED | The service has stopped the stream from working because the limit of events (records) to be transferred during the data conversion or replication process has been reached. |
| STOPPED             | The service has been intentionally stopped by the user or administrator.                                                                                                    |
| UNKNOWN_ERROR       | The service encountered an unexpected error during the data conversion or replication.                                                                                      |
