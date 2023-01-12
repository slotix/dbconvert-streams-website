---
title: Getting Started.
description: How to get started with DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

Once you have installed DBConvert Streams, you can explore other documentation sections to understand the general concepts or try DBS yourself.

### What is a data stream?

A _Data Stream_ is a sequence of actions that continuously collects data from sources and transmits it to targets. Stream
processing allows you to move data in real-time.

_Data Stream configuration_ is a set of source and target connection parameters and other options for collecting, transmitting, and delivering data.

## DBConvert Streams (DBS) Architecture.

DBConvert Streams consists of several components running on your hardware or deployed in one
or multiple virtual machines in a cloud.

### DBS components

- **API Server** is used to create new streams (pipelines), manage them, and get their statistics.
- **Source Reader** continuously collects events from the specified data source. The received data is then passed to the DBS Event Hub for consumption by target writers.
- **Target Writer** subscribes to the specified data stream in the event hub. The Target Writer writes received events (database records) to the target as soon as they arrive.

### Other components

- **NATS** is the core component of the Event Hub service that connects Source Readers with Target Writer.
- **Prometheus** is responsible for monitoring streams' statistics.

## Using API

API Server is used to perform the following _data stream_ tasks:

- creating a new stream,
- getting stream configuration,
- getting statistics,
- stopping streams.

DBConvert Streams API is based on REST. It uses HTTP requests to access and use data, accepts JSON request bodies, and returns JSON responses.

### Stream Configuration.

A typical stream configuration is a JSON object that looks like this:

```json
{
  "source": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
    "settings": {
      "sslCA": "../../config/mysql/client-ssl/ca.pem",
      "sslCert": "../../config/mysql/client-ssl/client-cert.pem",
      "sslKey": "../../config/mysql/client-ssl/client-key.pem"
    },
    "filter": {
      "tables": [
        { "name": "products1", "operations": ["insert", "update", "delete"] },
        { "name": "products2", "operations": ["insert", "update", "delete"] },
        { "name": "products3", "operations": ["insert", "update", "delete"] }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination?sslmode=verify-ca&sslrootcert=../../config/postgresql/certs/ca.crt&sslkey=../../config/postgresql/certs/client.key&sslcert=../../config/postgresql/certs/client.crt"
  },
  "limits": {
    "numberOfEvents": 10000,
    "elapsedTime": 600
  }
}
```

### Source.

In DBConvert Streams, readers collect data from external sources such as MySQL/MariaDB binary log (binlog), PostgreSQL/CockroachDB logical replication slot.

Source adapter configuration consists of the following properties:

| property       | description                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| type           | represents the source type. It can be MySQL or PostgreSQL.                                                                                   |
| connection     | a string representing the connection parameters.                                                                                             |
| settings       | settings are unique for each source type. Find information about the settings for each source type in the documentation's relevant sections. |
| filter/ tables | specified source data tables to capture.                                                                                                     |

### Target.

In DBConvert Streams, writers send data to external targets such as MySQL and PostgreSQL databases.
| property | description |
|------------|---------------------------------------------------------------|
| type | represents the target type. It can be MySQL or PostgreSQL. |
| connection | string representing the connection parameters. |

### Limits.

If no _limits_ are specified in a configuration, a started stream continues running until it is manually stopped from API.

Otherwise, a stream stops immediately after reaching one of the following limits, whichever limit is reached first:

| property       | description                                                    |
| -------------- | -------------------------------------------------------------- |
| numberOfEvents | the specified number of events captured from the source.       |
| elapsedTime    | (in seconds). the elapsed time since startup has been reached. |

## Create a new Stream.

First, let's create a new Stream from the configuration below. We will read incoming events from MySQL and stream them to the Postgres database. Limit parameters equal to zero or omitted limit section means no limits.

There are two ways to create a new stream:
First, you can send a new stream configuration in the request body like so:

```bash
curl --request POST --url http://0.0.0.0:8020/api/v1/streams -H 'Content-Type:application/json' -d'{
  "source": {
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
    "settings": {
      "sslCA": "../../config/mysql/client-ssl/ca.pem",
      "sslCert": "../../config/mysql/client-ssl/client-cert.pem",
      "sslKey": "../../config/mysql/client-ssl/client-key.pem"
    },
    "filter": {
      "tables": [
        { "name": "products1", "operations": ["insert", "update", "delete"] },
        { "name": "products2", "operations": ["insert", "update", "delete"] },
        { "name": "products3", "operations": ["insert", "update", "delete"] }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination?sslmode=verify-ca&sslrootcert=../../config/postgresql/certs/ca.crt&sslkey=../../config/postgresql/certs/client.key&sslcert=../../config/postgresql/certs/client.crt"
  },
  "limits": {
    "numberOfEvents": 0,
    "elapsedTime": 0
  }
}'
```

The second way is to load a stream configuration directly from a file on the local drive.

```bash
curl --request POST --url http://127.0.0.1:8020/api/v1/streams\?file=stream-config.json
```

### Response.

The response returns the status and configuration of the newly created thread, including the new thread ID.

```json
{
  "status": "success",
  "data": {
    "id": "2Fdj6JALDAm53S7Q4NxzH3sffzM",
    "source": {...},
	"target": {...},
	"limits": {...}
  }
}
```

## Stream status.

Let's check the status of the current stream.

```bash
curl --request GET --url http://127.0.0.1:8020/api/v1/streams/stat
```

As a result, you may see something like this:

```json
{
  "streamID": "2Fdj6JALDAm53S7Q4NxzH3sffzM",
  "source": {
    "counter": 0,
    "elapsed": "0s",
    "started": "0001-01-01T00:00:00Z",
    "status": "READY"
  },
  "target": {
    "counter": 0,
    "elapsed": "0s",
    "started": "0001-01-01T00:00:00Z",
    "status": "READY"
  }
}
```

The `READY` state indicates that the stream is ready to capture changes from the source database and publish them to the event hub.

After registering the first event, such as an INSERT, UPDATE, or DELETE record in the source database, the source and target statuses will change to `RUNNING.`

If you [check the status](#stream-status) right now, you will see something like this:

```JSON
{
   "streamID":"2Fdj6JALDAm53S7Q4NxzH3sffzM",
   "source":{
      "counter":10000,
      "elapsed":"0s",
      "started":"2022-10-19T12:08:20.839059479+02:00",
      "status":"RUNNING"
   },
   "target":{
      "counter":10000,
      "elapsed":"0s",
      "started":"2022-10-19T12:08:20.839468001+02:00",
      "status":"RUNNING"
   }
}
```

Find more information about all available [Statuses](/guide/status).

## Stop stream

You must send a `DELETE` request to the `streams` endpoint to stop the current stream from executing.

```sh
curl --request DELETE  --url http://0.0.0.0:8020/api/v1/streams
```

The API server returns the following response:

```json
{
  "streamID": "2Fdj6JALDAm53S7Q4NxzH3sffzM",
  "Source": {
    "status": "STOPPED"
  },
  "Target": {
    "status": "STOPPED"
  }
}
```

Recheck the stats.

```bash
curl --request GET --url http://127.0.0.1:8020/api/v1/streams/stat
```

```JSON
{
   "streamID":"2Fdj6JALDAm53S7Q4NxzH3sffzM",
   "source":{
      "counter":10000,
      "elapsed":"7m33.561343815s",
      "started":"2022-10-19T12:08:20.839059479+02:00",
      "status":"STOPPED"
   },
   "target":{
      "counter":10000,
      "elapsed":"7m33.561957109s",
      "started":"2022-10-19T12:08:20.839468001+02:00",
      "status":"STOPPED"
   }
}
```

Elapsed time shows how much time has passed since starting of the stream. Source and target statuses changed to `STOPPED.`
