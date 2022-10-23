---
title: Getting Started.
description: How to get started with DBConvert Stream.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}


Once you installed DBConvert Stream, you may explore other Documentation sections on your own to understand general concepts, or try DBConvert Stream yourself.

### What is data stream?
A _Data Stream_ is a sequence of actions that continuously collects data from sources and transfers it to targets. Stream processing enables the Real-time movement of data.

_Data Stream configuration_ describes how data streams are set up to collect, flow and delivery of data. 

## DBConvert Stream Architecture.

DBConvert Stream consists of several components running on your hardware or deployed in a multi-server cluster on one or more virtual machines.

### DBConvert Stream services
- **API Server** is used to create new streams (pipelines), manage and get statistics about existing streams.
- **Source Reader** continuously collects data  from your repository of data. Ingested data is passed to Event Hub to be consumed by Target Writers. 
- **Target Writer** subscribes to events in Event Hub. Target Writer writes consumed Events (database records) continuously to either MySQL or Postgres target databases. 

### Other services:
- **NATS** is the core component of Event Hub service thas is used to connect Source Readers with Target Writer. 
- **Prometheus** is responsible for monitoring statistics about streams.


## Using API

API Server is used to automate all tasks that you perform with streams like create a new stream, get stream configuration, statistics, stop stream.

DBConvert Stream API is organized around REST. It uses HTTP requests to access and use data, accepts JSON request bodies, returns JSON responses.


### Stream Configuration.

Typical stream configuration is a JSON object looks like this:

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
    "events": 10000,
    "time": 600
  }
}
```

### Source.
In DBConvert Stream readers collect data from external sources such as MySQL/ MariaDB binary log (binlog), PostgreSQL/ CockroachDB logical replication slot.

Source adapter configuration consists of the following properties:

| property       | description                                                                                                                    |
|----------------|--------------------------------------------------------------------------------------------------------------------------------|
| type           | represents source type. It can be either mysql or postgresql.                                                                  |
| connection     | string representing the connection parameters.                                                                                 |
| settings       | settings are unique for each source type. More information about settings can be found in corresponded documentation sections. |
| filter/ tables | restricts capture of source data to specific tables.                                                                           |                                                  



### Target.
In DBConvert Stream writers send data to external targets such as MySQL and PostgreSQL databases.
| property   | description                                                   |
|------------|---------------------------------------------------------------|
| type       | represents target type. It can be either mysql or postgresql. |
| connection | string representing the connection parameters.                |


### Limits.

By default, a new stream will work endlessly until it is stopped. 

If limits parameters are specified, the stream will be stopped immediately after reaching on of them: 

| property | description                                                                         |
|----------|-------------------------------------------------------------------------------------|
| events   | specified number of events captured from the source.  |
| time     | the time elapsed since starting is reached.|


## Create a new Stream.

First, let's create a new Stream from the configuration above. We are going to read incoming events from MySQL and stream them to Postgres database. Limits' parameters equal to zero or omitted limits section means no limits. 

Theres are two ways available.

First, you can send new stream configuration in a request body such as:

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
    "events": 0,
    "time": 0
  }
}'
```
or load a stream configuration directly from the file on the local disk.


```bash
curl --request POST --url http://127.0.0.1:8020/api/v1/streams?file=stream-config.json '
```

### Response.
As a result status and configuration of the newly created stream, including the new stream ID are returned. 

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
curl --request GET --url http://127.0.0.1:8020/api/v1/streams/stat'
```

as a result you can see something like this:
```json
{
   "streamID":"2Fdj6JALDAm53S7Q4NxzH3sffzM",
   "source":{
      "counter":0,
      "elapsed":"0s",
      "started":"0001-01-01T00:00:00Z",
      "status":"READY"
   },
   "target":{
      "counter":0,
      "elapsed":"0s",
      "started":"0001-01-01T00:00:00Z",
      "status":"READY"
   }
}
```

`READY` state means that the stream is ready to capture changes in the source database and publish them to the event hub.


Since registering the first event like INSERT, UPDATE or DELETE record in the source database, statuses of source and target will be changed to `RUNNING`.


If you check the status right now you will see something like this:

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
In order to stop the current stream you have to send DELETE request to the `streams` endpoint. 

```sh
curl --request DELETE  --url http://0.0.0.0:8020/api/v1/streams
```

API server returns the following response:

```json
{
   "streamID":"2Fdj6JALDAm53S7Q4NxzH3sffzM",
   "Source":{
      "status":"STOPPED"
   },
   "Target":{
      "status":"STOPPED"
   }
}
```

Check stats once again.

```bash
curl --request GET --url http://127.0.0.1:8020/api/v1/streams/stat'
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

Elapsed time shows how much time it took since starting of the stream. Statuses of source and target changed to `STOPPED`.