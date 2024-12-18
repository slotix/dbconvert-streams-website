---
title: Stream States and Lifecycle
description: Learn about the states and lifecycle of DBConvert Streams.
---

# Stream States and Lifecycle.

## Overview

DBConvert Streams follow a well-defined lifecycle with specific states that indicate the current status of data transfer operations. Understanding these states and their transitions is crucial for effectively managing and monitoring your streams.

## Stream States

### READY
- Initial state after stream creation
- Stream is configured but not yet started
- Waiting for user action to begin data transfer
- All configurations and connections are validated

### RUNNING
- Active state during data transfer
- Source is being read and data is being written to target
- Progress can be monitored through dashboard
- Supports both CDC and conversion modes
- Can be manually paused or stopped

### FINISHED
- Successful completion state
- All data has been transferred according to configuration
- Applies mainly to conversion mode streams
- CDC streams reach this state only when explicit limits are met

### FAILED
- Error state indicating unsuccessful operation
- Can occur due to:
  - Connection issues
  - Permission problems
  - Invalid configurations
  - Database constraints
- Requires investigation and potential reconfiguration

### TIME_LIMIT_REACHED
- Stream stopped after reaching configured time duration
- Controlled by 'Elapsed Time' setting
- Useful for scheduling maintenance windows
- Can be restarted manually if needed

### EVENT_LIMIT_REACHED
- Stream stopped after processing specified number of events
- Controlled by 'Number of Events' setting
- Useful for controlled data transfer sessions
- Particularly valuable in CDC mode

### PAUSED
- Temporary suspension of stream processing
- Stream can be resumed to continue data transfer
- Occurs in two scenarios:
  - Manual pause by user
  - Automatic pause when monthly data transfer limit is reached
- All progress and metrics are preserved while paused

### STOPPED
- Manual termination state
- User-initiated stream stoppage
- Clean shutdown of all processes
- Can be restarted if needed

## Common State Transitions

1. Normal Operation Flow:
   ```
   READY → RUNNING → FINISHED
   ```

2. Limited Operation Flow:
   ```
   READY → RUNNING → TIME_LIMIT_REACHED
   READY → RUNNING → EVENT_LIMIT_REACHED
   ```

3. Error Flow:
   ```
   READY → RUNNING → FAILED

   ```

## Best Practices

1. State Monitoring
   - Regularly check stream states through dashboard
   - Set up notifications for FAILED state
   - Monitor streams approaching configured limits

2. Error Handling
   - Investigate FAILED states promptly
   - Check system logs for detailed error messages


3. Performance Optimization
   - Use time limits for maintenance windows
   - Set appropriate event limits for controlled transfers
   - Monitor resource usage during RUNNING state
   - Plan for optimal transfer windows

## Troubleshooting Guide

### FAILED State
1. Check connection status to source and target
2. Verify user permissions
3. Review system logs for error messages
4. Validate configuration settings