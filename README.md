# web‑monitor

A lightweight, real‑time dashboard for monitoring the uptime and response times of web applications.  
It polls your configured HTTP endpoints, stores metrics in memory, streams updates to a browser dashboard, and can notify you when thresholds are breached.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Getting Started

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or yarn install
cp .env.example .env
# Edit .env with your settings
npm run dev           # starts the dev server with hot reload
# or
npm start             # production build
```

Open <http://localhost:3000> to view the live dashboard.

---

## Configuration

Create a `.env` file at the repository root. A template is provided as `.env.example`.

| Variable          | Default | Purpose                                              |
|-------------------|---------|------------------------------------------------------|
| `POLL_INTERVAL_MS`| `30000` | How often the script polls each endpoint (ms).      |
| `ALERT_THRESHOLD_MS` | `1200` | Response time above which an alert is sent.         |
| `SLACK_WEBHOOK`   | `""`    | Incoming Slack webhook URL (leave empty to disable).|
| `SMTP_HOST`       | `""`    | SMTP host for email alerts (leave empty to disable).|
| `SMTP_PORT`       | `587`   | SMTP port.                                           |
| `SMTP_USER`       | `""`    | SMTP username.                                       |
| `SMTP_PASS`       | `""`    | SMTP password.                                       |
| `LOG_ROTATION`   | `false` | `true` to delete logs older than the retention period.|

Only one notification channel is required – set SMTP or Slack only.

### Endpoints

Add the URLs you want to monitor to `config/endpoints.json`:

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### Theme file

Place a `theme.json` next to `config/endpoints.json`. It supports `${VAR}` interpolation and simple SASS‑like functions.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Features

- Real‑time dashboard with WebSocket updates
- Heatmap of latency across all monitored endpoints
- Alerting via Slack, email, or both
- Optional log rotation
- Custom theming through `theme.json`
- Zero‑config endpoints – just add URLs to `config/endpoints.json`

---

## Architecture Overview

```
┌──────────────────────┐
│  config/endpoints.json │
└───────┬────────────────┘
        │
┌───────▼─────────────────────┐
│       src/poller.js         │
│  Sends HTTP requests and     │
│  stores metrics in memory   │
└───────▲─────────────────────┘
        │
┌───────▼─────────────────────┐
│       src/alerts.js          │
│  Evaluates thresholds and    │
│  triggers Slack/email        │
└───────▲─────────────────────┘
        │
┌───────▼─────────────────────┐
│       src/dashboard.js      │
│  Streams metrics to the UI via│
│  WebSocket                    │
└──────────────────────────────┘
```

---

## Development

### Testing

```bash
npm test
```

The test suite (Jest) covers polling logic, alert evaluation, and API routes.

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
3. Run the tests: `npm test`.  
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
