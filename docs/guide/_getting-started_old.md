---
title: Getting Started.
description: How to get started with DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

Once you have installed DBConvert Streams, you can explore other documentation
sections to understand the general concepts or try DBS yourself.

### What is a data stream?

A _Data Stream_ is a sequence of actions that continuously collects data from
sources and transmits it to targets. Stream processing allows you to move data
in real-time.

_Data Stream configuration_ is a set of source and target connection parameters
and other options for collecting, transmitting, and delivering data.

## DBConvert Streams (DBS) Architecture.

DBConvert Streams consists of several components running on your hardware or
deployed in one or multiple virtual machines in a cloud.

### DBS components

- **API Server** is used to create new streams (pipelines), manage them, and get
  their statistics.
- **Source Reader** continuously collects events from the specified data source.
  The received data is then passed to the DBS Event Hub for consumption by
  target writers.
- **Target Writer** subscribes to the specified data stream in the event hub.
  The Target Writer writes received events (database records) to the target as
  soon as they arrive.

### Other components

- **NATS** is the core component of the Event Hub service that connects Source
  Readers with Target Writer.
- **Prometheus** is responsible for monitoring streams' statistics.

## Using API

API Server is used to perform the following _data stream_ tasks:

- creating a new stream,
- getting stream configuration,
- getting statistics,
- stopping streams.

DBConvert Streams API is based on REST. It uses HTTP requests to access and use
data, accepts JSON request bodies, and returns JSON responses.

## Stream Configurations.

A minimal stream configuration would look like this in JSON format:

```JSON
{
  "source": {
    "mode": "cdc",
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/source"
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/target"
  }
}
```

When configuring a stream, several necessary parameters must be defined to
ensure the proper functioning of the data transfer. These parameters include the
source and target databases' connection details, the database type, and the
chosen mode of operation, either `CDC` or `convert`.

### Advanced configuration options.

Here is an example of a more advanced configuration:

```json
{
  "source": {
    "mode": "convert",
    "type": "mysql",
    "connection": "mysql_user:passw0rd@tcp(0.0.0.0:3306)/Source?tls=true",
    "dataBundleSize": 50,
    "reportingInterval": 5,
    "settings": {
      "sslCA": "../../config/mysql/client-ssl/ca.pem",
      "sslCert": "../../config/mysql/client-ssl/client-cert.pem",
      "sslKey": "../../config/mysql/client-ssl/client-key.pem"
    },
    "filter": {
      "tables": [
        { "name": "products1", "operations": ["insert", "update", "delete"] },
        { "name": "products2", "operations": ["insert", "update"] },
        { "name": "products3", "operations": ["insert"] }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination?sslmode=verify-ca&sslrootcert=../../config/postgresql/certs/ca.crt&sslkey=../../config/postgresql/certs/client.key&sslcert=../../config/postgresql/certs/client.crt",
    "reportingInterval": 10
  },
  "limits": {
    "numberOfEvents": 10000,
    "elapsedTime": 600
  }
}
```

### Source.

Source adapter configuration consists of the following properties:

| property          | description                                                                                                                                                                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode              | It can be CDC or convert.                                                                                                                                                                                                                                                                                      |
| type              | represents the source type. It can be MySQL or PostgreSQL.                                                                                                                                                                                                                                                        |
| connection        | a string representing the connection parameters.                                                                                                                                                                                                                                                                  |
| settings          | settings are unique for each source type. Find information about the settings for each source type in the documentation's relevant sections.                                                                                                                                                                      |
| dataBundleSize    | parameter that optimizes the size of data bundles during transmission.                                                                                                                                                                                                                                            |
| reportingInterval | (in seconds). It allows users to define the frequency at which progress reports are generated to keep users informed about the status of data transfer. If `reportingInterval` is set to zero or omitted, no statistics will be returned while the stream is running, providing flexibility for silent operation. |
| filter/ tables    | specified source data tables to capture or convert.                                                                                                                                                                                                                                                               |

In CDC mode, source readers collect data from external sources, either from the
MySQL/MariaDB binary log (binlog) or from the PostgreSQL/CockroachDB logical
replication slot.\
On the other hand, in convert mode, data is read in chunks directly from tables.

### Filters

You only need to explicitly define table filters in the stream configuration to
specify specific tables for monitoring or conversion. DBConvert Streams will
automatically include all tables by default, simplifying the configuration
process and reducing the need for manual table selection.

When the filter section is empty in `CDC` mode, DBConvert Streams will monitor
all tables in the source database's transaction logs, capturing data changes
from every table and generating the corresponding events for consumption.

In "convert mode," if the filter section is not provided or is left empty,
DBConvert Streams will convert all tables from the source database to the target
database, ensuring a comprehensive and complete data migration.

### Target.

Target writers send data to external targets such as MySQL and PostgreSQL
databases.

| property   | description                                                |
| ---------- | ---------------------------------------------------------- |
| type       | represents the target type. It can be MySQL or PostgreSQL. |
| connection | string representing the connection parameters.             |

### Limits.

If no limits are specified in the configuration for _CDC mode_, a started stream
will continue running until it is manually stopped from the API. In the case of
_conversion mode_, the source reader will read all records from the specified
source tables.

Otherwise, a stream stops immediately after reaching one of the following
limits, whichever limit is reached first:

| property       | description                                                    |
| -------------- | -------------------------------------------------------------- |
| numberOfEvents | the specified number of events captured from the source.       |
| elapsedTime    | (in seconds). the elapsed time since startup has been reached. |

## Create a new Stream.

First, let's create a new Stream from the configuration below. We will read
incoming events from MySQL and stream them to the Postgres database. Limit
parameters equal to zero or omitted limit section means no limits.

There are two ways to create a new stream: First, you can send a new stream
configuration in the request body like so:

```bash
curl --request POST --url http://0.0.0.0:8020/api/v1/streams -H 'Content-Type:application/json' -d'{
  "source": {
    "mode": "convert",
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
        { "name": "products2", "operations": ["insert", "update"] },
        { "name": "products3", "operations": ["insert"] }
      ]
    }
  },
  "target": {
    "type": "postgresql",
    "connection": "postgres://postgres:postgres@localhost:5432/destination?sslmode=verify-ca&sslrootcert=../../config/postgresql/certs/ca.crt&sslkey=../../config/postgresql/certs/client.key&sslcert=../../config/postgresql/certs/client.crt"
  }
}'
```

The second way is to load a stream configuration directly from a file on the
local drive.

```bash
curl --request POST --url http://127.0.0.1:8020/api/v1/streams\?file=stream-config.json
```

### Response.

The response returns the status and configuration of the newly created thread,
including the new thread ID.

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

The `READY` state indicates that the stream is ready to capture changes from the
source database and publish them to the event hub.

After registering the first event, such as an INSERT, UPDATE, or DELETE record
in the source database, the source and target statuses will change to `RUNNING.`

If you [check the status](#stream-status) right now, you will see something like
this:

```JSON
{
  "streamID": "2Fdj6JALDAm53S7Q4NxzH3sffzM",
  "source": {
    "counter": 10000,
    "elapsed": "0s",
    "started": "2022-10-19T12:08:20.839059479+02:00",
    "status": "RUNNING"
  },
  "target": {
    "counter": 10000,
    "elapsed": "0s",
    "started": "2022-10-19T12:08:20.839468001+02:00",
    "status": "RUNNING"
  }
}
```


## Stop stream

You must send a `DELETE` request to the `streams` endpoint to stop the current
stream from executing.

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
  "streamID": "2Fdj6JALDAm53S7Q4NxzH3sffzM",
  "source": {
    "counter": 10000,
    "elapsed": "7m33.561343815s",
    "started": "2022-10-19T12:08:20.839059479+02:00",
    "status": "STOPPED"
  },
  "target": {
    "counter": 10000,
    "elapsed": "7m33.561957109s",
    "started": "2022-10-19T12:08:20.839468001+02:00",
    "status": "STOPPED"
  }
}
```

Elapsed time shows how much time has passed since starting of the stream. Source
and target statuses changed to `STOPPED.`
