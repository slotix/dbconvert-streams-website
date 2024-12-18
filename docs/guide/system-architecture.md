---
title: System Architecture
description: System Architecture of DBConvert Streams
layout: doc
lastUpdated: true
---

# System Architecture.


## Overview

DBConvert Streams is a distributed data processing platform designed for database migration and real-time replication. The architecture emphasizes scalability, reliability, and efficient handling of both real-time change data capture (CDC) and bulk data transfers.

## General Structure

DBConvert Streams follows a modern client-server architecture consisting of:

### Backend Components

The backend is implemented as a set of lightweight Go binaries that provide the core functionality:

#### 1. API Server: The API server binary that:

- Exposes RESTful endpoints for stream and connection management
- Handles user authentication and authorization
- Manages stream configurations and lifecycle
- Interfaces with Clerk for identity management
- Integrates with Stripe for subscription handling


#### 2. Source Reader: The source reader binary that:

- Connects to and reads from source databases
- Implements both CDC and conversion mode logic
- Publishes data to NATS messaging system
- Reports progress metrics


#### 3. Target Writer: The target writer binary that:

- Consumes data from NATS
- Writes to target databases
- Handles schema creation and data type mapping
- Can be scaled horizontally by running multiple instances


Each binary is designed to be:

- Lightweight (under 10MB)
- Independently deployable
- Stateless for easy scaling
- Configurable through command-line flags and environment variables

### Frontend Application

The frontend is a modern web application that provides:

- Intuitive dashboard for stream management
- Real-time monitoring and statistics
- Database connection management
- Stream configuration wizards
- System health monitoring


Technical Characteristics:

- Browser-based access
- Responsive design for different screen sizes
- Real-time updates using WebSocket connections
- Integration with the backend API
- Secure authentication flow


Key UI Components:

- Connection management interface
- Stream configuration wizard
- Real-time monitoring dashboard
- Usage statistics and quota tracking
- System status indicators



This architecture allows for flexible deployment options while maintaining a clear separation of concerns between the data processing logic in the backend and the user interface in the frontend.

## Core Components

The platform consists of three main components working in concert:

### 1. API Server
- Functions as the central control plane
- Manages user authentication and API key validation through integration with Clerk
- Handles stream lifecycle and configuration management
- Interfaces with Stripe for subscription management
- Tracks usage metrics 
- Coordinates communication between Source Readers and Target Writers

### 2. Source Reader
- Reads data from source databases using specialized adapters
- Supports two distinct reading modes:
  - CDC Mode: Captures changes from transaction logs (WAL/binlog)
  - Conversion Mode: Performs direct table reads with intelligent chunking
- Manages connection pooling and implements retry logic
- Publishes data to NATS messaging system

### 3. Target Writer
- Consumes data from NATS and writes to target databases
- Handles schema creation and automatic type mapping between different databases
- Supports horizontal scaling for improved performance
- Implements transaction management and consistency checks
- Can run multiple instances in parallel for better throughput

## Infrastructure Components

### NATS Integration
- Functions as the backbone for inter-component communication
- Provides reliable message streaming between Source Readers and Target Writers
- Supports persistence and replay of messages for fault tolerance
- Enables horizontal scaling through distributed messaging
- Creates dedicated streams for reliable data transfer operations

### HashiCorp Vault Integration
- Securely stores and manages sensitive information:
  - Database credentials
  - SSL certificates
  - Connection parameters

### HashiCorp Consul Integration
- Handles service discovery and registration
- Provides health checking and monitoring
- Manages distributed configuration

## Data Flow Architecture

### 1. Initialization Phase
1. Reader retrieves meta-structures (tables/indexes) from source database
2. Meta-structures are sent to NATS for communication
3. Target Writer creates structures on target database

### 2. Data Transfer Phase
1. Source Reader retrieves data in configurable bundles
2. Data is published to NATS streams
3. Target Writers consume and write data in parallel
4. Progress metrics are collected and reported
5. System maintains consistency through transaction management

### 3. Monitoring and Control
- Real-time progress tracking and metrics collection 
- Support for horizontal scaling of Target Writers
- Reporting of stream status and progress
- Pause and resume operations
- Comprehensive logging  

## Security Architecture

### Authentication and Authorization
- Integration with Clerk for user authentication
- API key validation for service access
- SSL/TLS encryption for data in transit

### Database Security
- Secure credential management through Vault
- Support for SSL/TLS database connections
- Client certificate management
- Encrypted storage of sensitive configuration

## Deployment Options

- Docker container deployment
- Cloud platform support:
  - Amazon Web Services (AWS)
  - Google Cloud
  - Microsoft Azure
- On-premises installation
- Horizontal scaling capabilities

## Performance Features

### Optimization Techniques
- Configurable data bundle sizes (10-1000 records)
- Parallel processing of insert operations
- Intelligent chunking for large tables
- Connection pooling and resource management


## Limitations and Constraints

- MySQL CDC requires binary logging enabled
- PostgreSQL CDC requires logical replication configuration
- Specific database version requirements:
  - PostgreSQL 10 or higher
  - MySQL 8.0 or higher
- API key required for all operations
- Proper database permissions needed for CDC/replication

This architecture provides the foundation for DBConvert Streams' reliable data transfer capabilities while maintaining flexibility for different deployment scenarios and use cases.