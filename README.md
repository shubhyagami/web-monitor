# web‑monitor

A lightweight dashboard for real‑time monitoring of web‑application uptime and latency.  
It polls HTTP endpoints, stores metrics in memory, streams live updates to a browser, and sends alerts when thresholds are exceeded.

![](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![](https://img.shields.io/badge/license-MIT-blue)  
![](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)  
![](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Quick start

```
# Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies
npm install          # or yarn install

# Copy the environment template and configure
cp .env.example .env
# Edit .env as needed

# Run in development mode
npm run dev

# Build and start a production instance
npm run build
npm start
```

Open <http://localhost:3000> to view the dashboard.

---

## Configuration

Create a `.env` file in the project root. Below is a template with default values:

| Variable            | Default | Description |
|----------------------|----------|--------------|
| `POLL_INTERVAL_MS` | `30000`  | How often each endpoint is polled (milliseconds). |
| `ALERT_THRESHOLD_MS` | `1200`   | Latency (ms) that triggers an alert. |
| `SLACK_WEBHOOK`      | `""`     | Incoming Slack webhook URL (omit to disable). |
| `SMTP_HOST`          | `""`     | SMTP host for email alerts (omit to disable). |
| `SMTP_PORT`          | `587`    | SMTP port. |
| `SMTP_USER`          | `""`     | SMTP username. |
| `SMTP_PASS`          | `""`     | SMTP password. |
| `LOG_ROTATION`       | `false`  | If `true`, logs older than the retention period are deleted. |

Only one notification channel is required; alerts will be sent to all configured channels.

---

## Endpoints

Add the URLs you want to monitor in `config/endpoints.json`:

```
[
    "https://example.com",
    "https://api.example.org/health"
]
```

Each URL is displayed as a separate card on the dashboard.

---

## Theming

Provide a `theme.json` beside `config/endpoints.json`.  
It supports `${VAR}` interpolation and simple SASS‑style helpers (`lighten`, `darken`, `rgba`, etc.):

```
{
    "primaryColor": "#1e90ff",
    "fontFamily": "Arial, sans-serif",
    "gridBackground": "lighten($primaryColor, 30%)"
}
```

See the bundled `theme.json` for a full list of options.

---

## Features

- Real‑time updates via WebSocket
- Heatmap view of per‑endpoint latency
- Alerts through Slack, email, or both
- Optional log rotation
- Custom theming with `theme.json`
- Zero‑config endpoint discovery

---

## Architecture

```
config/endpoints.json
        │
        ▼
src/poller.js          → Sends HTTP requests, stores metrics
        │
        ▼
src/alerts.js          → Evaluates thresholds, triggers Slack/email
        │
        ▼
src/dashboard.js       → Streams metrics to the UI via WebSocket
```

---

## Development

### Testing

```
npm test
```

The Jest suite covers polling logic, alert evaluation, and HTTP routes.

### Linting & Formatting

```
npm run lint     # ESLint
npm run format   # Prettier
```

Run both before submitting a pull request.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/your-feature`).  
3. Run `npm test` to ensure all tests pass.  
4. Commit with a clear message.  
5. Push and open a pull request.  
6. Make sure linting passes.

All contributions are welcome—please keep the code style consistent and tests passing.

---

## Changelog

### v2.4.1 – 2026‑07‑14
- Added log rotation toggle.  
- Improved heatmap responsiveness.  
- Fixed theme variable parsing.

### v2.3.0 – 2026‑05‑02
- Introduced Slack alert support.  
- Added advanced dashboard theming.

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
