---
title: Secure Credential Management with HashiCorp Vault
description: Secure Credential Management with HashiCorp Vault for DBConvert Streams.
layout: doc
lastUpdated: true
---

# Secure Credential Management with HashiCorp Vault.

## Overview

DBConvert Streams uses [HashiCorp Vault](https://www.vaultproject.io/) as its secure credential management solution. All sensitive information - including database passwords, SSL certificates, and API keys - is stored and managed securely within Vault, ensuring that no sensitive data is exposed in configuration files or environment variables.



## Stored Information Types

### Credentials
- Database usernames and passwords
- API keys
- Connection strings

### Certificates
- SSL/TLS certificates
- Client certificates
- Private keys
- CA certificates

### Configuration
- Encryption keys
- Security policies
- Access tokens
- Connection parameters

