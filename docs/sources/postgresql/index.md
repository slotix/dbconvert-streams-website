---
title: DBConvert-stream - Usage
description: Counter
layout: doc
lastUpdated: true
---

![Transaction Log Change Data Capture](/images/postgresql/postgresql-cdc.png)

DBConvert Stream supports PostgreSQL v10.x and later versions. 

PostgreSQL Reader uses [Logical Replication](https://www.postgresql.org/docs/10/logical-replication.html) that was introduced in PostgreSQL 10 to capture changes in a Postgres database.

Incoming Insert, Update and Delete events from WAL transaction logs are decoded with standard logic decoding plugin `pgoutput` which is shipped with PostgreSQL natively.

Data change Events consumed from [logical decoding stream](https://www.postgresql.org/docs/current/protocol-replication.html) are then sent to the DBConvert event bus.


## PostgreSQL configuration in Linux or Windows


### postgresql.conf settings.

Change the following settings in your `postgresql.conf`:
``` ini
wal_level=logical
max_wal_senders=5
max_replication_slots=10
```


Setting `wal_level` to `logical` allows the PostgreSQL Transaction Log (WAL) to record information needed for logical decoding.

Ensure that your max_replication_slots value is equal to or higher than the number of PostgreSQL connectors that use WAL plus the number of other replication slots your database uses.

Ensure that the max_wal_senders parameter, which specifies the maximum number of concurrent connections to the WAL, is at least twice the number of logical replication slots. For example, if your database uses 5 replication slots in total, the max_wal_senders value must be 10 or greater.


### pg_hba.conf configuration.

`pg_hba.conf` is PostgreSQL Client Authentication Configuration File.
A short synopsis from the real pg_hba.conf follows


This file controls: which hosts are allowed to connect, how clients
are authenticated, which PostgreSQL user names they can use, which
databases they can access.

Edit `pg_hba.conf` and add the following records, replacing `<IP address>` with the DBConvert Stream Server IP address. USER can be "all", an existing user name.

```
local   replication     USER            <IP address>/0          trust
```

Example: 
```
host    replication     all             127.0.0.1/32            trust
```

If you have a multi-node cluster, add a record for each server that will run PostgreSQL Reader. Then save the file and restart PostgreSQL.



Save changes to `pg_hba.conf` and restart PostgreSQL to take effect.

### Publication and slot

 When the Postgres reader starts, the publication & slot created automatically from the parameters provided in source configuration. 


## PostgreSQL reader properties

Before using this adapter, PostgreSQL must be configured as described above.

