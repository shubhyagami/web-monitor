# web‑monitor

Web‑monitor is a lightweight, real‑time dashboard that tracks the uptime and latency of HTTP endpoints.  
It polls the configured URLs, keeps metrics in memory, and streams updates to a browser via WebSocket.  
Alerts are sent through Slack, SMTP, or both when your thresholds are exceeded.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# 2. Install
npm install          # or yarn

# 3. Create the environment file
cp .env.example .env
# Edit .env to match your setup

# 4. Run locally (hot reloading)
npm run dev

# 5. Build for production
npm run build
npm start
```

Open <http://localhost:3000> to see the dashboard.

---

## Overview

- **Polling** – configurable interval per endpoint.
- **Live metrics** – updates pushed to the browser with a single WebSocket connection.
- **Alerts** – Slack, email, or both. Thresholds are adjustable.
- **Dashboard** – heatmap, uptime, error rate, and custom themes.

---

## Configuration

### Environment variables

Create a `.env` file in the project root. The table below lists all available options and their defaults:

| Variable           | Default | Description |
|--------------------|---------|-------------|
| `POLL_INTERVAL_MS` | `30000` | Milliseconds between polls of each endpoint. |
| `ALERT_THRESHOLD_MS` | `1200`  | Latency (ms) that triggers an alert. |
| `SLACK_WEBHOOK`     | `""`    | Incoming Slack webhook URL (empty disables Slack notifications). |
| `SMTP_HOST`         | `""`    | SMTP host for email alerts (empty disables email notifications). |
| `SMTP_PORT`         | `587`   | SMTP port. |
| `SMTP_USER`         | `""`    | SMTP username. |
| `SMTP_PASS`         | `""`    | SMTP password. |
| `LOG_ROTATION`      | `false` | Delete logs older than the retention period when `true`. |

> **NOTE** – At least one notification channel (Slack **or** SMTP) must be configured for alerts to work.

### Endpoints

Add the URLs you want to monitor in `config/endpoints.json`:

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

Every URL becomes a separate card on the dashboard.

### Theming

Place a `theme.json` next to `config/endpoints.json`.  
The file supports `${VAR}` interpolation and simple SASS‑style helpers (`lighten`, `darken`, `rgba`, etc.):

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

See the bundled `theme.json` for a full list of options.

---

## Features

- Real‑time metrics via WebSocket
- Latency heatmap per endpoint
- Uptime and error tracking
- Alerts through Slack, SMTP email, or both
- Optional log rotation
- Custom theming with `theme.json`
- Zero‑config endpoint discovery (add to `endpoints.json`)

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

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Scripts

| Script        | Purpose |
|---------------|---------|
| `npm run dev` | Start the dev server with hot reloading |
| `npm run build` | Build the production bundle |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm test` | Run Jest test suite |

### Testing

```bash
npm test
```

The test suite covers the polling logic, alert evaluation, and HTTP routes.

### Linting & formatting

```bash
npm run lint     # ESLint
npm run format   # Prettier
```

Both checks should pass before submitting a pull request.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/your-feature`).  
3. Run `npm test` to make sure everything passes.  
4. Commit with a clear, concise message.  
5. Push and open a pull request.  
6. Ensure linting passes.

All contributions are welcome—please keep the code style consistent and add tests when relevant.

---

## Changelog

### v2.4.1 – 2026‑07‑14

- Added log rotation toggle
- Improved heatmap responsiveness
- Fixed theme variable parsing

### v2.3.0 – 2026‑05‑02

- Introduced Slack alert support
- Added advanced dashboard theming

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
