---
title: Install DBConvert Stream.
description: How to DBConvert Stream Platform.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

There are different ways to install or run DBConvert Stream:
- Zip archive.
- Docker

## Supported operating systems and architectures.
The following table lists the current supported DBS build combinations for operating systems and architectures.

| Operating System  | Architectures   |
|-------------- | -------------- |  
| Linux | amd64, arm64     |
| Darwin (macOS)| amd64     |
| Windows | amd64     |


## Installing pre-requisites.

DBConvert Stream uses NATS and Prometheus pre-requisites internally.

### NATS Server.
The DBS Event Hub is built on top of NATS, providing connectivity between other DBConvert Stream components. Install [NATS server](https://docs.nats.io/running-a-nats-service/introduction/installation) following instructions on the page. 

**NOTE:** `nats-server` have to be launched with `--jetstream` flag to enable [JetStream functionality](https://docs.nats.io/nats-concepts/jetstream). 

```bash
nats-server --jetstream
```

Starting NATS Server should output something like that:
```
[84405] 2022/11/22 00:36:29.789413 [INF] Starting nats-server
[84405] 2022/11/22 00:36:29.789435 [INF]   Version:  2.9.6
[84405] 2022/11/22 00:36:29.789438 [INF]   Git:      [289a9e1]
[84405] 2022/11/22 00:36:29.789440 [INF]   Name:     NDXYABFMKOCZA4PEVT2GSVF7C2JAI4B42SQETDLQPE5EMARK47IFGPWM
[84405] 2022/11/22 00:36:29.789442 [INF]   Node:     7E3Re3Ip
[84405] 2022/11/22 00:36:29.789444 [INF]   ID:       NDXYABFMKOCZA4PEVT2GSVF7C2JAI4B42SQETDLQPE5EMARK47IFGPWM
[84405] 2022/11/22 00:36:29.789606 [INF] Starting JetStream
[84405] 2022/11/22 00:36:29.854582 [INF]     _ ___ _____ ___ _____ ___ ___   _   __  __
[84405] 2022/11/22 00:36:29.854593 [INF]  _ | | __|_   _/ __|_   _| _ \ __| /_\ |  \/  |
[84405] 2022/11/22 00:36:29.854595 [INF] | || | _|  | | \__ \ | | |   / _| / _ \| |\/| |
[84405] 2022/11/22 00:36:29.854597 [INF]  \__/|___| |_| |___/ |_| |_|_\___/_/ \_\_|  |_|
[84405] 2022/11/22 00:36:29.854599 [INF]
[84405] 2022/11/22 00:36:29.854601 [INF]          https://docs.nats.io/jetstream
[84405] 2022/11/22 00:36:29.854603 [INF]
[84405] 2022/11/22 00:36:29.854605 [INF] ---------------- JETSTREAM ----------------
[84405] 2022/11/22 00:36:29.854613 [INF]   Max Memory:      23.23 GB
[84405] 2022/11/22 00:36:29.854616 [INF]   Max Storage:     11.58 GB
[84405] 2022/11/22 00:36:29.854618 [INF]   Store Directory: "/tmp/nats/jetstream"
[84405] 2022/11/22 00:36:29.854620 [INF] -------------------------------------------
[84405] 2022/11/22 00:36:29.854819 [INF] Listening for client connections on 0.0.0.0:4222
[84405] 2022/11/22 00:36:29.855012 [INF] Server is ready

```

### Prometheus. 
DBConvert Stream components collect internal metrics and expose them to Prometheus. Follow the instructions on the appropriate page to [Install Prometheus](https://prometheus.io/docs/prometheus/latest/installation/) 

This is a sample prometheus configuration file that periodically scrapes DBS statistics endpoints.

Please copy and paste content of the config in YAML format below and save it as `prometheus.yml` file.

```yaml
global:
  # How frequently to scrape targets by default.
  scrape_interval:     15s
  # How frequently to evaluate rules.
  evaluation_interval: 15s

rule_files:
  # - "first.rules"
  # - "second.rules"

scrape_configs:
  # Override the global default and scrape the Source Reader every second.
  - job_name: 'source'
    scrape_interval: 1s
    static_configs:
    - targets: ['0.0.0.0:8021']

  # Override the global default and scrape the Target Writers every second.
  - job_name: 'target'
    scrape_interval: 1s
    static_configs:
    # The targets specified by the static config. 
    - targets: ['0.0.0.0:8022', '0.0.0.0:8023', '0.0.0.0:8024']
```

A `scrape_configs` section specifies a set of targets and parameters describing how to scrape them. 
 
A `static_configs` allows specifying a list of targets. Three targets listed in `job_name: 'target'` means prometheus scrapes three instances of Target writers running on 8022-8024 ports. 


Then run prometheus in the second terminal, specifying the config created above:

```bash
prometheus --config.file=prometheus.yml            
```

Open http://0.0.0.0:9090/targets address in web browser. 


![Prometheus initial state](/images/prometheus-init.png)

You can see that prometheus started scraping configured endpoints. These endpoints are now in `DOWN` state until corresponding services started. 

## Installing DBS Binaries.

Installation of DBS services is just decompressing a zip file and copying binaries to an appropriate folder.

### Download.

You could manually download the zip file matching your systems architecture, and unzip it. You could also use curl to download a specific version. 

The example below shows how to download version 1.0.0 of the DBConvert Stream for Linux AMD64:

```bash
curl -L https://dbconvert.com/downloads/dbs/v1.0.0/dbs-v1.0.0-linux-amd64.zip -o dbs.zip
```


> Please refer to [DBS Releases](/dbs-releases) page to download the latest version of DBConvert Stream for your platform.  

### Unzip.

After downloading unzip the package to a folder. 

```sh
unzip dbs.zip -d dbs
```

```
Archive:  dbs.zip
  inflating: dbs/dbs-api
  inflating: dbs/dbs-source-reader
  inflating: dbs/dbs-target-writer
```

### Run
Finally you will have 3 unpacked DBS binaries:
1. `dbs-api` - **DBConvert Stream API** server is used to get requests from clients to manage streams and provide communication between other DBS Services like source readers and target writers.
2. `dbs-source-reader` - **DBConvert Stream Source Reader** is used for continuous data collection from specified source. 
3. `dbs-target-writer` - **DBConvert Stream Target Writer** writes collected events from source to specified target. 

Launch DBS Services in separate terminals:

Run DBS API Server and  DBS Source Reader. 
They will start on their default ports `8020` and `8021` accordingly.
```bash
./dbs-api
```

```bash
./dbs-source-reader
```

It is enough to have just one instance of DBS Target Writer running, if no heavy load on a source database. But for demonstration purposes we will start three instances of DBConvert Stream Target writers. The first one is started on its default port `8022`. You could customize IP address and port with `-host` flag. So let's start two other DBS Writers on custom ports `8023` and  `8024`
```bash
./dbs-target-writer
```
```bash
./dbs-target-writer -host 0.0.0.0:8023
```

```bash
./dbs-target-writer -host 0.0.0.0:8024
```
Finally you have the following running services:
- NATS Server
- Prometheus
- DBS API Server
- DBS Source Reader
- 3 instances of DBS Target Writers.

![Launched services](/images/launched-services.png)

If you check now [prometheus targets endpoint](http://0.0.0.0:9090/targets) in the browser you should see all source and targets are changed their  status to `UP`.


![prometheus running services](/images/prometheus-running-services.png)

Refer to the next sections for more information about using DBConvert Stream API.
