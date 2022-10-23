---
title: DBConvert-stream - Usage
description: MySQL
layout: doc
lastUpdated: true
---

# MySQL Related info

## mysqldump

For the mysqldump user you have to grant the following minimal MySQL privileges:

## MYSQLDUMP --SINGLE-TRANSACTION (INNODB)

The following grants to mysql user should be provided:

- SELECT
- SHOW VIEW
- RELOAD
- REPLICATION CLIENT
- REPLICATION SLAVE
- EVENT
- TRIGGER

```sql
CREATE USER 'dbconvert'@'localhost' IDENTIFIED BY 'secret';
GRANT SELECT, SHOW VIEW, RELOAD, REPLICATION CLIENT, REPLICATION SLAVE, EVENT, TRIGGER ON *.* TO 'dbconvert'@'%';
```

## MYSQLDUMP --LOCK-ALL-TABLES (MYISAM)

```sql
GRANT LOCK TABLES ON *.* TO 'backup'@'localhost';
```

```bash
mysqldump --host=127.0.0.1 --port=3306 --user=root --password=dmsoft --master-data --single-transaction --skip-lock-tables --compact --skip-opt --quick --no-create-info --skip-extended-insert --skip-tz-utc --hex-blob --default-character-set=utf8 --column-statistics=0 --all-databases  
```

```bash
mysqldump --host=127.0.0.1 --port=3306 --user=mysql_user --password=dmsoft --master-data --single-transaction --skip-lock-tables --compact --skip-opt --quick --no-create-info --skip-extended-insert --skip-tz-utc --hex-blob --default-character-set=utf8 --column-statistics=0 --all-databases --ssl-ca=~/client-ssl/ca.pem --ssl-cert=~/client-ssl/client-cert.pem --ssl-key=~/client-ssl/client-key.pem
```

#### TLS-Encryption parameters

| sslMode     | Description                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled    | Establish an unencrypted connection                                                                                                                                         |
| skip-verify | Crypto/TLS accepts any certificate presented by the server and any host name in that certificate.                                                                           |
| preferred   | Establish an encrypted connection if the server supports encrypted connections, falling back to an unencrypted connection if an encrypted connection cannot be established. |
| verify-ca   | Verify the server Certificate Authority (CA) certificate against the configured CA certificates.                                                                            |

```sql
ALTER USER 'mysql_user'@'%' REQUIRE SSL;
ALTER USER 'mysql_user'@'%' REQUIRE X509;
ALTER USER 'mysql_user'@'%' REQUIRE NONE;
```

| Path to certificate |                                                                |
| ------------------- | -------------------------------------------------------------- |
| sslCA               | File that contains list of trusted SSL Certificate Authorities |
| sslCert             | File that contains X.509 certificate                           |
| sslKey              | File that contains X.509 key                                   |



### System variables

**binlog_row_event_max_size** 
When row-based binary logging is used, this setting is a soft limit on the maximum size of a row-based binary log event, in bytes.
More info at https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_row_event_max_size

It affect directly on the number of Records in each event when reading from Binlog

binlog_row_event_max_size=16384
```
[2022/02/07 21:35:33] [info] source/binlog.go:27 Header: &{Timestamp:1644266132 EventType:WriteRowsEventV2 ServerID:4 EventSize:16142 LogPos:2698323 Flags:0} # of Recs: 59 
[2022/02/07 21:35:33] [info] source/binlog.go:27 Header: &{Timestamp:1644266132 EventType:WriteRowsEventV2 ServerID:4 EventSize:11228 LogPos:2709551 Flags:0} # of Recs: 41 
```

binlog_row_event_max_size=8192
```
[2022/02/07 21:56:20] [info] source/binlog.go:27 Header: &{Timestamp:1644267380 EventType:WriteRowsEventV2 ServerID:4 EventSize:7952 LogPos:2724604 Flags:0} # of Recs: 29 
[2022/02/07 21:56:20] [info] source/binlog.go:27 Header: &{Timestamp:1644267380 EventType:WriteRowsEventV2 ServerID:4 EventSize:7952 LogPos:2732556 Flags:0} # of Recs: 29 
[2022/02/07 21:56:20] [info] source/binlog.go:27 Header: &{Timestamp:1644267380 EventType:WriteRowsEventV2 ServerID:4 EventSize:7952 LogPos:2740508 Flags:0} # of Recs: 29 
[2022/02/07 21:56:20] [info] source/binlog.go:27 Header: &{Timestamp:1644267380 EventType:WriteRowsEventV2 ServerID:4 EventSize:3584 LogPos:2744092 Flags:0} # of Recs: 13
```

### GTID

**enforce-gtid-consistency** and **gtid-mode** only takes effect if binary logging takes place for a statement.
No need to switch it ON for row based log.
enforce-gtid-consistency=OFF
gtid-mode=OFF




### Docker

#### Start MySQL

```bash
docker run \
--detach \
--rm \
--name=mysql \
--env="MYSQL_ROOT_PASSWORD=dmsoft" \
--publish 3306:3306 \
--volume=/home/dm/dbconvert/dbconvert-stream/config/mysql/conf.d:/etc/mysql/conf.d \
--volume=/home/dm/dbconvert/dbconvert-stream/_storage/mysql-data:/var/lib/mysql \
mysql
```

#### Prepare test DBs

mariadb10.2 (binlog format must be 'raw')
In binlog.go change with your connection data

```json
cfg.Addr = fmt.Sprintf("%s:%d", "127.0.0.1", 3306) //host,port
cfg.User = "root"
cfg.Password = "root"
```

Create database with sql

```sql
create table Test.User
(
  id int auto_increment primary key,
  name varchar(40) null,
  status enum("active","deleted") DEFAULT "active",
  created timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
  engine=InnoDB;
```

```sql
create table Test.Products
(
  id int auto_increment primary key,
  name varchar(40) null,
  price decimal(6,2) NOT NULL,
  created timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
  engine=InnoDB;
```

than execute sql

```sql
INSERT Into Test.User (`id`,`name`) VALUE (3,"Ioann");
UPDATE Test.User SET name="Jonh" WHERE id=3;
DELETE FROM Test.User WHERE id=3;
INSERT Into Test.Products (`id`,`name`,`price`) VALUES (1,"Bread",0.69), (2, "Butter", 2.59), (3, "Fanta", 1.09) ;
UPDATE Test.Products SET name="Coca-Cola" WHERE id=3;
DELETE FROM Test.Products;sql
```

### Notes

"github.com/jmoiron/sqlx" slows down the process of transferring data to MySQL destination as it uses reflect.


### FAQ

Q: ERROR 1067 (42000): Invalid default value for 'created_at'. How to solve?
A: Table has a timestamp column with a default value of "0000-00-00 00:00:00". The problem is due to sql_modes. Check your current sql_mode with the command:

```
show variables like 'sql_mode' ; 
```

And remove sql_mode "NO_ZERO_IN_DATE, NO_ZERO_DATE" to make it work. This is the default sql_mode in new versions of mysql.

You can set sql_mode globally as root with the command:

```
set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```

https://stackoverflow.com/questions/36882149/error-1067-42000-invalid-default-value-for-created-at






## Create Stream

```bash
curl --request POST --url http://127.0.0.1:8020/ -H 'Content-Type: application/json' -d '{
   "source":{
      "type":"mysql",
      "connection":{
         "host":"0.0.0.0",
         "port":3306,
         "user":"mysql_user",
         "password":"dmsoft",
         "database":"Source",
         "sslMode":"verify-ca",
         "sslCA":"config/mysql/client-ssl/ca.pem",
         "sslCert":"config/mysql/client-ssl/client-cert.pem",
         "sslKey":"config/mysql/client-ssl/client-key.pem"
      },
      "settings":{
         "useDecimal":true,
         "parseTime":true,
         "pingInterval":10
      },
      "initialLoad":false,
      "filter":{
         "tables":{
            "products1":[
               "snapshot",
               "insert",
               "update",
               "delete"
            ],
            "products2":[
               "snapshot",
               "insert",
               "update",
               "delete"
            ]
         }
      }
   },
   "destination":{
      "type":"mysql",
      "connection":{
         "host":"0.0.0.0",
         "port":3306,
         "user":"mysql_user",
         "password":"dmsoft",
         "database":"Destination",
         "sslMode":"verify-ca",
         "sslCA":"config/mysql/client-ssl/ca.pem",
         "sslCert":"config/mysql/client-ssl/client-cert.pem",
         "sslKey":"config/mysql/client-ssl/client-key.pem"
      },
      "initialLoad":false,
      "filter":{
         "tables":{
            "products1":[
               "snapshot",
               "insert",
               "update",
               "delete"
            ],
            "products2":[
               "snapshot",
               "insert",
               "update",
               "delete"
            ]
         }
      }
   },
   "limits":{
      "records":100000,
      "time":0
   }
}'
```



```bash
mysql -u mysql_user -p -h 127.0.0.1 --ssl-ca=config/mysql/client-ssl/ca.pem --ssl-cert=config/mysql/client-ssl/client-cert.pem --ssl-key=config/mysql/client-ssl/client-key.pem
```