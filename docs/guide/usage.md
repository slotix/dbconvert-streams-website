---
title: DBConvert-stream - Usage
description: Counter
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}


## Real-time data integration platform


### Response 

```JSON
{
	"stream":{
	   "id":"22IieXEiAzXYsS7RmrY3171ghiR",
	   "startTime":"2021-12-15T02:26:37+01:00",
	   "status":"INIT"
	}
}
```


## Stop stream
```sh
curl --request GET --url http://127.0.0.1:8020/stop
```


## Stop stream server
```bash
curl --request GET --url http://127.0.0.1:8020/shutdown
```


There are 3 ways to stop a stream:
1. By default, it will work endlessly until it is stopped by calling the endpoint ``/stop``
2. Set limits in the payload to stop a stream when
   2.1 the number of transferred records has been reached or
   2.2 the specified time has expired.


## Status

```bash
curl --request GET --url http://127.0.0.1:8020/stat | jq
```



### Docker containers


## Build & Run

```bash
go build -o dg ./datagen/mysql/wg/*   
GOOS=windows GOARCH=amd64 go build -o test.exe 

dg -chunk 1000 -workers 1000 -password dmsoft


go build -o dst ./cmd/destination/mysql/destination.go
go build -o src ./cmd/source/mysql/source.go
```


### JSONiter

Marshal ~ the same as standard encoding/json
Unmarshal is faster than standard encoding/json
--
Update: Go 1.14 json beats json-iterator in performance
https://github.com/json-iterator/go/issues/455 
 -> Moving to encoding/json

## TRASH
ignoreDeletes, ignoreUpdates bool ???