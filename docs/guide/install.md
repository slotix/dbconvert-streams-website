---
title: Install DBConvert Streams.
description: How to install DBConvert Streams.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

You can install and run the DBConvert Streams binaries on your machine from the latest version; unpack the Zip file and copy the DBS binaries to the appropriate directory.

## Supported operating systems and architectures.

The following table lists the currently supported DBS build combinations for operating systems and architectures.

| Operating System | Architectures |
| ---------------- | ------------- |
| Linux            | amd64, arm64  |
| Darwin (macOS)   | amd64         |
| Windows          | amd64         |

## Install required third-party components.

"DBConvert Streams" for internal use requires NATS and Prometheus to be installed.

### NATS Server.

The DBS Event Hub is built on top of NATS, allowing communication between other DBConvert Streams components. Follow the instructions for [installing the NATS server] (https://docs.nats.io/running-a-nats-service/introduction/installation).

> **IMPORTANT:** `nats-server` must be started with `--jetstream` flag to enable [JetStream functionality](https://docs.nats.io/nats-concepts/jetstream).

```bash
nats-server --jetstream
```

A running NATS server should output something like this:

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

DBConvert Streams components collect internal metrics and expose them to Prometheus. Follow the instructions for [Installing Prometheus](https://prometheus.io/docs/prometheus/latest/installation/)

The example Prometheus configuration below periodically scrapes DBS statistics endpoints.

Copy the contents of the YAML configuration below and save it in the `prometheus.yml` file.

```yaml
global:
  # How frequently to scrape targets by default.
  scrape_interval: 15s
  # How frequently to evaluate rules.
  evaluation_interval: 15s

rule_files:
  # - "first.rules"
  # - "second.rules"

scrape_configs:
  # Override the global default and scrape the Source Reader every second.
  - job_name: "source"
    scrape_interval: 1s
    static_configs:
      - targets: ["0.0.0.0:8021"]

  # Override the global default and scrape the Target Writers every second.
  - job_name: "target"
    scrape_interval: 1s
    static_configs:
      # The targets specified by the static config.
      - targets: ["0.0.0.0:8022", "0.0.0.0:8023", "0.0.0.0:8024"]
```

A `scrape_configs` section defines a set of targets and parameters describing how to scrape them.

A `static_configs` allows you to specify a list of targets. Three targets set in `job_name: 'target'` means that Prometheus scrapes three instances of Target writers running on ports 8022-8024.

Run Prometheus in the second terminal, specifying the config created above:

```bash
prometheus --config.file=prometheus.yml
```

Open http://0.0.0.0:9090/targets address in a web browser.

![Prometheus initial state](/images/prometheus-init.png)

You can see that Prometheus has started scraping the configured endpoints. These endpoints are now in the `DOWN` state until the appropriate services are started.

## Installing DDBConvert Streams Binaries.

Installing DBS is just extracting a zip file and copying the binaries to the appropriate folder.

### Download.

You could manually download the ZIP archive matching your system architecture and unzip it.

The example below shows how to download version 1.0.0 of the DBConvert Streams for Linux AMD64 with `curl`:

```bash
curl -L https://dbconvert.com/downloads/dbs/v1.0.0/dbs-v1.0.0-linux-amd64.zip -o dbs.zip
```

> Please refer to the [DBS Releases](/dbs-releases) page to download the latest (or any) version of DBConvert Streams for your platform.

### Unzip.

Once downloaded, unzip the package to any folder.

```sh
unzip dbs.zip -d dbs
```

```
Archive:  dbs.zip
  inflating: dbs/EULA.md
  inflating: dbs/README.md
  inflating: dbs/dbs-api
  inflating: dbs/dbs-source-reader
  inflating: dbs/dbs-target-writer
```

### Run

Finally, you will have three unpacked DBS binaries:

1. `dbs-api` - The **DBConvert Streams API** server is used to receive requests from clients to manage streams and provide communication between other DBS services, such as source readers and target writers.
2. `dbs-source-reader` - **DBConvert Streams Source Reader** is used to continuously collect data from a specified source.
3. `dbs-target-writer` - **DBConvert Streams Target Writer** writes the collected events from a source to a specified target.

Start DBS Services in separate terminals:

Launch DBS API Server and DBS Source Reader.
Accordingly, they will run on their default ports, `8020` and `8021`.

```bash
./dbs-api
```

```bash
./dbs-source-reader
```

In most cases, it is enough to have only one instance of DBS Target Writer running unless there is a heavy load on the source database. But for demonstration purposes, we will run three DBConvert Streams Target writers. The first one runs on the default port, `8022`. Let's create two other DBS writers on custom ports: `8023` and `8024`.

You can configure the IP address and port with the `-host` flag.

```bash
./dbs-target-writer
```

```bash
./dbs-target-writer -host 0.0.0.0:8023
```

```bash
./dbs-target-writer -host 0.0.0.0:8024
```

Finally, you have the following running services:

- NATS Server
- Prometheus
- DBS API Server
- DBS Source Reader
- 3 instances of DBS Target Writers.

![Launched services](/images/launched-services.png)

If you now check [prometheus target endpoint](http://0.0.0.0:9090/targets) in a browser, you should see that all source and target endpoints have changed their status to `UP`.

![prometheus running services](/images/prometheus-running-services.png)

See the following sections for more information about using the DBConvert Streams API.
