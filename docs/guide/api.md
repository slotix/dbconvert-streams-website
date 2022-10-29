---
title: DBConvert Stream API.
description: DBConvert Stream API.
layout: doc
lastUpdated: true

---
# {{ $frontmatter.title }}

DBConvert Stream REST API allows you to performs all Stream management tasks. 

### What is REST API?

REST stands for REpresentational State Transfer. A REST API (also known as RESTful API) is a web API that follows the REST architecture and can interact with RESTful web services. REST APIs use HTTP requests to interact with the data. For example, with a REST API, you can use HTTP requests such as GET, POST, UPDATE, DELETE to read, create, update, and delete data stored on a computer or a system. You can specify the parameters in the request body of the API that help to identify the data and the actions to be performed on it.

In API terminology, the endpoint is the URL used to make the request. The _resource_ means the returned dataset. For example, in the endpoint http://0.0.0.0:8020/api/v1/streams HTTP POST request is used to create a new Stream. The resource is an information about newly created stream.

Sending HTTP GET request to the same endpoint http://0.0.0.0:8020/api/v1/streams returns current stream configuration.


### DBConvert Stream OpenAPI Swagger API Reference.

Refer to the API Reference to find information about the different endpoints that are available for each resource and how to  use them. 

Read more at https://app.swaggerhub.com/apis-docs/slotix/db-convert_stream_api_server/1.0

or 

https://redocly.github.io/redoc/?url=https://stream.dbconvert.com/assets/api/swagger-api.yaml

<!-- <script setup>
    import SwaggerUI from '../components/SwaggerUI.vue'
</script> 
<SwaggerUI/> -->