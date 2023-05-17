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

- [DBS API Server](https://hub.docker.com/r/slotix/dbs-api)
- [DBS Source Reader](https://hub.docker.com/r/slotix/dbs-source-reader)
- [DBS Target Writer](https://hub.docker.com/r/slotix/dbs-target-writer)

DBS platform depends on the following third-party services:

- [NATS server](https://hub.docker.com/_/nats/) provides connectivity between internal DBS Services.
- [Prometheus](https://hub.docker.com/r/prom/prometheus) is optionally used to collect internal metrics of DBS services.

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
      - --source=source-reader:8021
      - --target=target-writer:8022
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
      - dbs-api

  dbs-target-writer:
    container_name: target-writer
    image: slotix/dbs-target-writer
    entrypoint:
      - ./dbs-target-writer
      - --host=dbs-target-writer:8022  
      - --nats=nats:4222
      - --prometheus=http://prometheus:9090
    ports:
      - 8022:8022
    depends_on:
      - dbs-api


  # dbs-target-writer2:
  #   container_name: target-writer2
  #   image: slotix/dbs-target-writer
  #   entrypoint:
  #     - ./dbs-target-writer
  #     - --host=dbs-target-writer2:8023  
  #     - --nats=nats:4222
  #     - --prometheus=http://prometheus:9090
  #   ports:
  #     - 8023:8023
  #   depends_on:
  #     - dbs-api


  # dbs-target-writer3:
  #   container_name: target-writer3
  #   image: slotix/dbs-target-writer
  #   entrypoint:
  #     - ./dbs-target-writer
  #     - --host=dbs-target-writer3:8024  
  #     - --nats=nats:4222
  #     - --prometheus=http://prometheus:9090
  #   ports:
  #     - 8024:8024
  #   depends_on:
  #     - dbs-api

  nats:
    container_name: nats
    image: nats
    entrypoint: /nats-server
    command: "--jetstream -m 8222 --store_dir /data/nats-server"
    ports:
      - 4222:4222
      - 8222:8222
    # volumes:
    #   - ./_storage/nats:/data/nats-server/jetstream

  prometheus:
    image: slotix/dbs-prometheus:latest
    container_name: prom
    user: root
    ports:
      - 9090:9090
```
To improve overall performance, you can run multiple instances of the 'Target Writer' by uncommenting the 'dbs-target-writer-2' and 'dbs-target-writer-3' services. This will add more Target Writer instances and distribute the processing of multiple 'INSERT' statements among several Target Writers, greatly increasing the speed of the entire process.

Please copy content of the docker-compose config above and save it as `docker-compose.yml` file. 

Check out our github repository for a few [config examples](https://github.com/slotix/dbconvert-streams-public/tree/main/examples).

## Run.

Start all services with the following `docker-compose` command.

```bash
docker-compose up -d
```

Check if all services are started properly.

```bash
docker ps
```

```bash
CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS          PORTS                                                                                            NAMES
c7079e6488b8   slotix/dbs-api                 "./dbs-api --nats=na…"   48 seconds ago   Up 46 seconds   0.0.0.0:8020->8020/tcp, :::8020->8020/tcp                                                        api
f538a75dd135   slotix/dbs-target-writer       "./dbs-target-writer…"   48 seconds ago   Up 47 seconds   0.0.0.0:8022->8022/tcp, :::8022->8022/tcp                                                        target-writer
c8188a721f5e   slotix/dbs-source-reader       "./dbs-source-reader…"   48 seconds ago   Up 46 seconds   0.0.0.0:8021->8021/tcp, :::8021->8021/tcp                                                        source-reader
72ec84efad6a   slotix/dbs-prometheus:latest   "/bin/prometheus --c…"   48 seconds ago   Up 47 seconds   0.0.0.0:9090->9090/tcp, :::9090->9090/tcp                                                        prom
3d091c386b0b   nats                           "/nats-server --jets…"   48 seconds ago   Up 47 seconds   0.0.0.0:4222->4222/tcp, :::4222->4222/tcp, 0.0.0.0:8222->8222/tcp, :::8222->8222/tcp, 6222/tcp   nats
```

If you now check [prometheus target endpoint](http://0.0.0.0:9090/targets) in a browser, you should see that all source and target endpoints have changed their status to `UP`.

![prometheus running services](/images/prometheus-docker-running.png)

## Examples
For actual examples and configurations, refer to the public [DBConvert Streams Github repository](https://github.com/slotix/dbconvert-streams-public)


Follow the steps in [Run binaries](/guide/install) section if you prefer to install binaries instead of running Docker containers.
