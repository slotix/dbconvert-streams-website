---
title: Authentication Guide
description: DBConvert Streams Authentication Guide.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}


## Sign-In Options

DBConvert Streams provides multiple authentication methods:
- GitHub authentication
- Google authentication  
- Microsoft authentication
- Email/password authentication

## Authentication Flow

1. **Initial Authentication**
   - Users access the sign-in page
   - Choose their preferred authentication method
   - Complete authentication through Clerk's secure interface

![Initial Authentication](/images/auth/initial-auth.png)

2. **API Key Generation**
   - Upon successful authentication, an API key is automatically generated
   - The API key is displayed in the user dashboard
   - Users can copy or regenerate their API key as needed

![API Key Generation](/images/auth/api-key-generation.png)

3. **Using Your API Key**
   - Use the API key for all API requests
   - Include the key in the request header for authentication
   - The same API key works for both UI operations and direct API calls

## Security Best Practices

1. **API Key Management**
   - Store your API key securely
   - Never share your API key publicly
   - Rotate keys periodically using the "Update API Key" function
   - Use environment variables for API key storage in applications

2. **Access Control**
   - One API key per account
   - Keys have access to all features within your subscription tier

## Managing Your API Key

1. Access the API key management interface through:
   - The "Manage API Key" button in the dashboard
   - The account settings page

2. Available API key operations:
   - View current API key
   - Copy API key to clipboard
   - Generate new API key
   - Revoke existing key

## Rate Limiting and Quotas

- Data transfer is monitored and capped at your plan's monthly limit
- Usage statistics are available in real-time through the dashboard