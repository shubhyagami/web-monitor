# web‑monitor

A lightweight, real‑time dashboard that keeps an eye on the uptime and response times of your web applications. It polls the configured HTTP endpoints, keeps metrics in memory, streams live updates to a browser, and notifies you when thresholds are exceeded.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Quick Start

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies
npm install   # or yarn install

# Configure the application
cp .env.example .env
# Edit .env with your settings

# Run in development mode (hot‑reload)
npm run dev

# Or build and start a production server
npm run build
npm start
```

Open <http://localhost:3000> to view the dashboard.

---

## Configuration

Create a `.env` file at the project root (a template is provided as `.env.example`).

| Variable                | Default  | Description |
|--------------------------|----------|-------------|
| `POLL_INTERVAL_MS`      | `30000`  | Frequency, in milliseconds, at which each endpoint is polled. |
| `ALERT_THRESHOLD_MS`    | `1200`   | Response time (ms) that triggers an alert. |
| `SLACK_WEBHOOK`          | `""`     | Incoming Slack webhook URL (leave empty to disable). |
| `SMTP_HOST`              | `""`     | SMTP host for email alerts (leave empty to disable). |
| `SMTP_PORT`              | `587`    | SMTP port. |
| `SMTP_USER`              | `""`     | SMTP username. |
| `SMTP_PASS`              | `""`     | SMTP password. |
| `LOG_ROTATION`            | `false`  | Set to `true` to delete logs older than the retention period. |

**Only one notification channel is required** – enable either Slack or SMTP. If both are set, alerts will be sent to both.

---

## Endpoints

Add the URLs you wish to monitor in `config/endpoints.json`.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

The dashboard will display each URL as a separate card.

---

## Theming

The dashboard can be styled via a `theme.json` placed next to `config/endpoints.json`. It supports basic `${VAR}` interpolation and simple SASS‑like functions.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

Refer to the `theme.json` example for available functions.

---

## Features

- Real‑time updates via WebSocket
- Heatmap showing latency per endpoint
- Alerting through Slack, email, or both
- Optional log rotation
- Custom theming with `theme.json`
- Zero‑config endpoints – just add URLs

---

## Architecture

```
┌──────────────────────┐
│ config/endpoints.json │
└───────┬────────────────┘
        │
┌───────▼─────────────────────┐
│ src/poller.js               │
│ • Sends HTTP requests        │
│ • Stores metrics in memory   │
└───────▲─────────────────────┘
        │
┌───────▼─────────────────────┐
│ src/alerts.js               │
│ • Evaluates thresholds      │
│ • Triggers Slack/email      │
└───────▲─────────────────────┘
        │
┌───────▼─────────────────────┐
│ src/dashboard.js            │
│ • Streams metrics to the UI │
│   via WebSocket             │
└──────────────────────────────┘
```

---

## Development

### Testing

```bash
npm test
```

The Jest test suite covers polling logic, alert evaluation, and HTTP routes.

### Linting & Formatting

```bash
npm run lint     # ESLint
npm run format   # Prettier
```

Run both before submitting a pull request.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feat/your-feature`.  
3. Run `npm test` to verify existing tests.  
4. Commit with a clear message.  
5. Push and open a pull request.  
6. Ensure linting passes.

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
