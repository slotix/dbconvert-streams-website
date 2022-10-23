---
title: Glossary of terms.
description: Glossary of terms. DBConvert Stream.
layout: doc
lastUpdated: true
---
# {{ $frontmatter.title }}

The glossary contains an alphabetical list of terms that you may come across in DBConvert Stream’s documentation. Click on a letter to jump to the relevant section of the alphabet.


## A

## B

## C

## D

### Data stream.
See [Event stream](#event-stream)

## E

### Event.
A fundamental unit of data that represents the creation, update, or deletion of information in the Source and can be replicated to a Target system. For example, a new record in a PostgreSQL, or updated item details in the Items table in MySQL.

### Event stream.
An Event stream is composed of a series of events, much as a table in a SQL environment is composed of rows. Each event is a fixed sequence of data elements corresponding to the stream's type.
For example, take a system that continuously creates data. Each data point in that system represents an event. A continuous stream of those data points, or events, is referred to as an event stream.

 A stream is a table data in the move. Think of a never-ending table where new data appears as the time goes. A stream is such a table. One record or a row in a stream is called an event.

## I

### Ingestion
The act of retrieving or fetching data from the Source.

