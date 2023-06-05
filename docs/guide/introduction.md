---
title: Introduction.
description: What is DBConvert Streams?
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

DBConvert Streams provides a powerful and flexible solution for converting heterogeneous database data and facilitating real-time Change data capture (CDC)   data replication. Whether used by individuals or organizations, it can help streamline data management processes and achieve better business results.

DBS allows its users to perform seamless migrations between different types and locations of database systems. This provides greater flexibility and efficiency in managing data, leading to improved decision-making and business outcomes.

In addition, DBS offers many features and capabilities that make it a valuable tool for data management and integration. It provides automatic schema matching, mapping, custom data filters, and transformation rules.
Users can tailor the system to their needs and ensure data is appropriately integrated and organized.
 In addition, DBS is designed with scalability and robustness in mind, making it suitable for large-scale data use. It uses distributed computing techniques to provide high availability and fault tolerance and can be easily integrated with the IT infrastructure.

## Supported databases.

DBConvert Streams currently supports the following databases:

- MySQL
- MariaDB
- SingleStore DB (formerly MemSQL)
- TiDB
- Percona
- Vitess
- PostgreSQL   
- Greenplum Database 
- YugabyteDB
- EDB Postgres
- Citus
- CockroachDB
- Amazon RDS for MySQL
- Amazon Aurora (MySQL Compatible)
- SkySQL
- Amazon RDS for PostgreSQL
- Amazon Aurora (PostgreSQL Compatible)

## Supported platforms.
The native DBConvert Binaries are available for the following operating systems. 
- Linux AMD 64
- Linux ARM 64
- Apple OS X
- Windows
- Docker images

## Deployment.
DBConvert Streams can be deployed on the following cloud platforms: 
- [Amazon Web Services (AWS)](/guide/deploy-ec2)
- Google Cloud
- Microsoft Azure

## Preview version.
The preview edition of DBConvert Streams is being offered completely free of charge. We encourage you to share your experience and [provide feedback](mailto:streams@dbconvert.com).

## Two data reading modes in DBConvert Streams.

There are two modes for reading data from a source database:

### CDC (Change data capture).   
In [CDC (change data capture)](/sources/what-is-cdc) mode, DBConvert Streams provides a reliable way to stream changes from the source database to the target database using change data capture technology. By capturing row-level changes such as `inserts`, `updates`, and `deletes`, the software allows your target applications to respond to those events with very low latency. 

This feature enables real-time data replication and synchronization between databases, making it ideal for data warehousing, business intelligence, and reporting scenarios, where up-to-date data is critical for making informed decisions.

### Conversion Mode.

This mode enables the rapid transfer of data from the source database to the target database, regardless of whether they are located on-prem or in the cloud and whether they are relational databases or data warehouses. 


In conversion mode, DBConvert Streams uses an automated slicing technique to migrate even large tables from the source database quickly. By breaking data into smaller chunks, the transfer process can be optimized for speed and efficiency, resulting in faster and more reliable data migration between on-premises or cloud databases and relational or data stores.


## Why DBConvert Streams? 
Configuring real-time data replication or database migration typically requires specialized technical knowledge in database management, networking, and system administration. 

DBConvert Streams simplifies this process, making it accessible to users with basic knowledge of database administration. DBS software handles many technical aspects of configuring and optimizing the replication process behind the scenes, allowing users to focus on selecting the source and target databases and configuring a few key options. 

This streamlined approach can save time and reduce the need for specialized technical expertise, making it ideal for organizations that need real-time data synchronization without the resources to hire costly DBAs or DevOps engineers.





---

This documentation introduces **DBConvert Streams**, also known as **DBS**, to new and prospective users.

Review the sections in the documentation to familiarize yourself with DBConvert Streams and understand its functionality for seamless data replication.

Please [drop us a message](mailto:streams@dbconvert.com) for any clarification or report any documentation error. We eagerly seek your feedback to improve the content of this site.
