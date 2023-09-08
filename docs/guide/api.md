---
title: DBConvert Streams API.
description: DBConvert Streams API.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The DBConvert Streams REST API offers a wide range of endpoints to handle various stream control tasks:

**Streams Endpoints**

- Create new streams.
- Retrieve the configuration of streams.
- Fetch statistics for streams.
- Stop streams.

**Connections Endpoints**

- Create new database connections.
- List all existing connections.
- Retrieve information about a specific database connection.
- Retrieve meta information about a specific database connection.
- Delete a specific connection.


## What is REST API?

REST means REpresentational State Transfer. REST API (also known as RESTful API) is a web API that conforms to the REST architecture and can interact with RESTful web services.

REST APIs use HTTP requests to interact with data. For example, with the REST API, you can use HTTP requests such as GET, POST, UPDATE, and DELETE to read, create, update, and delete data stored on a computer. You can specify parameters in an API request that help identify the data and the actions to be performed on it.

In API terminology, _Endpoint_ is the URL used to make a request. _Resource_ means the returned data set. For example, at the http://0.0.0.0:8020/api/v1/streams endpoint, an HTTP `POST` request is used to create a new stream. The resource represents information about the newly created thread.

Sending HTTP `GET` request to the same endpoint http://0.0.0.0:8020/api/v1/streams returns the current stream configuration.

## DBConvert Streams OpenAPI Swagger API Reference.

Refer to the API Reference to find information about the different endpoints available for each resource and how to use them.

Read more at https://app.swaggerhub.com/apis-docs/slotix/db-convert_stream_api_server/1.2

or

https://redocly.github.io/redoc/?url=https://stream.dbconvert.com/assets/api/swagger-api.yaml
