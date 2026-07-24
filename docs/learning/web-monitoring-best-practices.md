# Web Monitoring Best Practices

## Key Metrics to Track
- **Response Time**: P95 and P99 latency
- **Error Rate**: 5xx, 4xx as percentage of requests
- **Throughput**: Requests per second
- **Uptime**: Availability (e.g., 99.9% SLA)

## Alerting Rules
- **Threshold Alerts**: Trigger when metric exceeds a critical value (e.g., latency > 2s)
- **Anomaly Detection**: Use rolling averages and standard deviations
- **Composite Alerts**: Combine multiple signals (e.g., high error rate + low throughput)

## Monitoring Strategy
1. **Synthetic Monitoring**: Simulate user flows from multiple locations
2. **Real User Monitoring (RUM)**: Collect actual browser performance data
3. **Log Aggregation**: Centralize logs for debugging and correlation

## Incident Response
- Define severity levels (P0–P3) with clear escalation paths
- Use runbooks for common failures (e.g., high memory, slow database queries)
- Post-incident reviews to improve monitoring coverage

> **Remember**: Monitor what matters to your users, not just infrastructure metrics.