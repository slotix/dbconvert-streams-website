---
title: Use Cases
description: Common use cases and implementation scenarios for DBConvert Streams
layout: doc
lastUpdated: true
---

# Use Cases

## Real-time CDC Replication Use Cases

DBConvert Streams enables applications to respond instantly to database changes through CDC replication. Here are the primary implementation patterns:

### Data Synchronization
- Replicate data between different database types
- Maintain consistency across distributed systems
- Synchronize information across data stores
- Implementation example: E-commerce inventory management across regions

### Event-Driven Applications
- Create derived views and computed data
- Aggregate changes within time windows
- Propagate data between microservices using transactional outbox pattern
- Implementation example: Financial data processing pipelines

### Cache and Index Management
- Clear cache entries when source data changes
- Update search indexes in real-time
- Keep derived data structures current
- Implementation example: Search engine synchronization

### Notification Systems
- Send push notifications based on data changes
- Trigger webhooks for external system updates
- Alert monitoring systems of specific changes
- Implementation example: Customer notification systems

## Database Conversion Use Cases

DBConvert Streams supports various database conversion scenarios:

### Platform Migration
- Move data between different database systems
- Handle data type conversion automatically
- Maintain data integrity during transfer
- Implementation example: Moving from MySQL to PostgreSQL

### Database Consolidation
- Merge multiple databases into a single platform
- Standardize data formats across systems
- Reduce infrastructure complexity
- Implementation example: Consolidating regional databases

### System Upgrades
- Facilitate database version upgrades
- Support cloud migration initiatives
- Enable platform modernization
- Implementation example: Moving to cloud-native databases

### Data Integration
- Combine data from multiple sources
- Transform data into consistent formats
- Enable cross-platform data access
- Implementation example: Building data warehouses

Each use case can be implemented using either CDC mode for real-time replication or Conversion mode for one-time transfers, depending on your specific requirements. For detailed implementation guidance, refer to our [Stream Configuration Guide](/streams/stream-configuration-guide).