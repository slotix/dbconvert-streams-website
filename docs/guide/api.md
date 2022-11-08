---
title: DBConvert Stream API.
description: DBConvert Stream API.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

The DBConvert Stream REST API allows you to perform all stream control tasks:

- creating new streams,
- getting streams configuration,
- getting statistics,
- stopping streams.

### What is REST API?

REST means REpresentational State Transfer. REST API (also known as RESTful API) is a web API that conforms to the REST architecture and can interact with RESTful web services.

REST APIs use HTTP requests to interact with data. For example, with the REST API, you can use HTTP requests such as GET, POST, UPDATE, and DELETE to read, create, update, and delete data stored on a computer. You can specify parameters in an API request that help identify the data and the actions to be performed on it.

In API terminology, _Endpoint_ is the URL used to make a request. _Resource_ means the returned data set. For example, at the http://0.0.0.0:8020/api/v1/streams endpoint, an HTTP `POST` request is used to create a new stream. The resource represents information about the newly created thread.

Sending HTTP `GET` request to the same endpoint http://0.0.0.0:8020/api/v1/streams returns the current stream configuration.

### DBConvert Stream OpenAPI Swagger API Reference.

Refer to the API Reference to find information about the different endpoints available for each resource and how to use them.

Read more at https://app.swaggerhub.com/apis-docs/slotix/db-convert_stream_api_server/1.0

or

https://redocly.github.io/redoc/?url=https://stream.dbconvert.com/assets/api/swagger-api.yaml
