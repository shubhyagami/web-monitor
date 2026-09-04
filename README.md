# web‑monitor

A lightweight, real‑time dashboard for monitoring the uptime and response times of web applications.  
It polls your configured HTTP endpoints, records metrics in memory, streams updates to a browser dashboard, and can alert you when thresholds are breached.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![WIP](https://img.shields.io/badge/Status-Active-blue)

---

## Quick start

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or yarn install
cp .env.example .env
# edit .env
npm run dev          # starts dev server with hot reload
# or
npm start            # production build
```

Open <http://localhost:3000> to see the live dashboard.

---

## Configuration

Create a `.env` file at the root. A template is available as `.env.example`.

| Variable | Default | Purpose |
|----------|---------|---------|
| `POLL_INTERVAL_MS` | `30000` | Poll frequency (ms) |
| `ALERT_THRESHOLD_MS` | `1200` | When response time exceeds this, an alert is sent |
| `SLACK_WEBHOOK` | `""` | Incoming Slack webhook URL |
| `SMTP_HOST` | `""` | SMTP host for e‑mail alerts |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_USER` | `""` | SMTP username |
| `SMTP_PASS` | `""` | SMTP password |
| `LOG_ROTATION` | `false` | `true` deletes logs older than the retention period |

Only one notification channel is needed: leaving all SMTP fields empty disables e‑mail alerts.

### Theme file

Place a `theme.json` in `config/` next to `endpoints.json`. The file supports `${VAR}` interpolation.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Features

- **Real‑time dashboard** with instant updates via WebSocket
- **Heatmap** of latency across all endpoints
- **Alerting**: Slack, e‑mail, or both
- **Log rotation** (optional)
- **Custom theming** through `theme.json`
- **Zero‑config endpoints** – add URLs to `config/endpoints.json`

---

## How it works

```
┌──────────────────────┐
│  config/endpoints.json │
└───────┬────────────────┘
        │
┌───────▼─────────────────────┐
│       src/poller.js         │
│  Sends HTTP requests and   │
│  stores metrics in memory   │
└───────▲─────────────────────┘
        │
┌───────▼─────────────────────┐
│       src/alerts.js          │
│  Evaluates thresholds and  │
│  triggers Slack/email      │
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

The test suite uses Jest and covers polling logic, alert evaluation, and API routes.

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
