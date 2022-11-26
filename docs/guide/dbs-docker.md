---
title: DBConvert Streams Docker images.
description: Pull and run DBConvert Streams docker images.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

## DBConvert Streams docker images.

DBConvert Streams services are available as Docker images on Docker Hub repository. DBS docker images are extremely lightweight under 10 Mb each.

DBConvert Streams consists of the following internal services:

- [DBS API Server](https://hub.docker.com/repository/docker/slotix/dbs-api)
- [DBS Source Reader](https://hub.docker.com/r/slotix/dbs-source-reader)
- [DBS Target Writer](https://hub.docker.com/r/slotix/dbs-target-writer)

DBS platform depends on the following third-party services:

- [NATS server](https://hub.docker.com/_/nats/) provides connectivity between internal DBS Services.
- [Prometheus](https://hub.docker.com/r/prom/prometheus) is used to collect internal metrics of DBS services.

## Creating Docker Compose configuration.

Since DBConvert Streams depends on multiple services, the best way to start docker containers using [Docker Compose](https://docs.docker.com/compose/).

Here is a simple example of docker-compose configuration for staring DBConvert Streams.

```yaml
version: "3.9"
services:
  dbs-api:
    container_name: api
    image: slotix/dbs-api
    entrypoint:
      - ./dbs-api
      - --nats=nats:4222
    ports:
      - 8020:8020
    depends_on:
      - nats

  dbs-source-reader:
    container_name: source-reader
    image: slotix/dbs-source-reader
    entrypoint:
      - ./dbs-source-reader
      - --nats=nats:4222
    ports:
      - 8021:8021
    depends_on:
      - nats

  dbs-target-writer:
    container_name: target-writer
    image: slotix/dbs-target-writer
    entrypoint:
      - ./dbs-target-writer
      - --nats=nats:4222
    ports:
      - 8022:8022
    depends_on:
      - nats

  #  dbs-target-writer2:
  #    container_name: target-writer2
  #    image: slotix/dbs-target-writer
  #    entrypoint:
  #      - ./dbs-target-writer
  #      - --nats=nats:4222
  #    ports:
  #      - 8023:8023
  #    depends_on:
  #      - nats
  #
  #  dbs-target-writer3:
  #    container_name: target-writer3
  #    image: slotix/dbs-target-writer
  #    entrypoint:
  #      - ./dbs-target-writer
  #      - --nats=nats:4222
  #    ports:
  #      - 8024:8024
  #    depends_on:
  #      - nats

  nats:
    container_name: nats
    image: nats
    entrypoint: /nats-server
    command: "--jetstream -m 8222 --store_dir /data/nats-server"
    ports:
      - 4222:4222
      - 8222:8222
    volumes:
      - ./_storage/nats:/data/nats-server/jetstream

  prometheus:
    image: slotix/dbs-prometheus:latest
    container_name: prom
    user: root
    ports:
      - 9090:9090
    volumes:
      - ./data/prometheus:/prometheus
```

You can run multiple instances of **Target writer** to improve overall performance. Just uncomment _dbs-target-writer-2_ and _dbs-target-writer-3_ services to distribute processing of multiple INSERT statements between several target writers, greatly speeding up the whole process.

Please copy content of the docker-compose config above and save it as `docker-compose.yml` file.

# Run

```bash
docker-compose up
```
