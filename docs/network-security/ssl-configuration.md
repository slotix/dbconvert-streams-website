---
title: SSL Configuration and Security Best Practices Guide
description: SSL Configuration and Security Best Practices Guide for DBConvert Streams.
layout: doc
lastUpdated: true
---

# SSL Configuration and Security Best Practices Guide.

## SSL Connection Setup

### Overview
DBConvert Streams supports secure SSL/TLS connections for both MySQL and PostgreSQL databases, ensuring data security during transmission. This guide will help you configure SSL connections properly and follow security best practices.

## SSL Configuration Options

### SSL Modes

1. **Disable**
   - No encryption
   - No server identity verification
   - Best for testing and development environments

2. **Require**
   - Encrypts all communications
   - Does not verify server identity
   - Minimum security level for production

2. **Verify-CA**
   - Encrypts all communications
   - Verifies server certificate
   - Validates certificate authority (CA)

3. **Verify-Full**
   - Highest security level
   - Encrypts all communications
   - Verifies server certificate
   - Validates hostname matches certificate

### Certificate Requirements

1. **CA Certificate**
   - Format: CRT or PEM
   - Max size: 1.0 MB
   - Used to verify server identity
   - Required for Verify-CA and Verify-Full modes

2. **Client Certificate**
   - Format: CRT or PEM
   - Max size: 1.0 MB
   - Used for client authentication
   - Required for mutual TLS (mTLS)

3. **Client Key**
   - Format: KEY or PEM
   - Max size: 1.0 MB
   - Private key for client certificate
   - Must be kept secure

## Database-Specific SSL Configuration

### MySQL SSL Setup

```sql
-- Check SSL status
SHOW VARIABLES LIKE '%ssl%';

-- Create SSL user requiring SSL
CREATE USER 'username'@'hostname' REQUIRE SSL;
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
```

### PostgreSQL SSL Setup

```sql
-- Check SSL connection status
SELECT ssl, version FROM pg_stat_ssl;

-- Configure postgresql.conf
ssl = on
ssl_cert_file = 'server-cert.pem'
ssl_key_file = 'server-key.pem'
ssl_ca_file = 'root.crt'
```

## Security Best Practices

### Certificate Management

1. **Certificate Generation**
   - Use strong key sizes (minimum 2048 bits)
   - Set appropriate validity periods
   - Use secure hash algorithms (SHA-256 or better)

2. **Certificate Storage**
   - Store certificates securely
   - Protect private keys
   - Regular backup of certificates
   - Implement proper access controls

3. **Certificate Maintenance**
   - Monitor certificate expiration dates
   - Plan certificate renewals
   - Maintain certificate revocation lists
   - Regular certificate validation

### Access Control

1. **User Management**
   - Create dedicated database users
   - Use least privilege principle
   - Regular credential rotation
   - Remove unused accounts

2. **Network Security**
   - Use firewalls to restrict access
   - Implement IP whitelisting
   - Monitor failed connection attempts
   - Regular security audits

### Production Environment

1. **Configuration Requirements**
   - Enforce SSL for all connections
   - Use Verify-Full mode when possible
   - Implement certificate validation
   - Regular security assessments

2. **Monitoring**
   - Track SSL connection status
   - Monitor certificate expiration
   - Log security events
   - Regular compliance checks

## Troubleshooting SSL Connections

### Common Issues

1. **Certificate Problems**
   ```text
   ERROR: certificate verify failed
   → Verify certificate chain
   → Confirm certificate dates
   ```

2. **Connection Failures**
   ```text
   ERROR: SSL connection required
   → Enable SSL on server
   → Check SSL configuration
   → Verify client certificates
   ```


### Validation Steps

1. **Test SSL Connection**
   - Use Test Connection button
   - Verify SSL parameters
   - Check server logs
   - Confirm certificate validity

2. **Certificate Verification**
   - Validate certificate chain
   - Check hostname matching
   - Verify key permissions
   - Confirm SSL mode

## Emergency Response

### Certificate Compromise

1. **Immediate Actions**
   - Revoke compromised certificates
   - Generate new certificates
   - Update all connections
   - Audit security logs

2. **Recovery Steps**
   - Deploy new certificates
   - Update connection configs
   - Verify secure connections
   - Document incident
