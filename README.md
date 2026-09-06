# web‑monitor

A lightweight, real‑time dashboard that watches the uptime and response times of your web applications. It polls configured HTTP endpoints, keeps metrics in memory, streams live updates to a browser, and notifies you when thresholds are crossed.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Overview

* **Live metrics:** WebSocket‑driven updates every `POLL_INTERVAL_MS` milliseconds.  
* **Heatmap & cards:** Visual latency for each endpoint.  
* **Instant alerts:** Slack webhook or SMTP email when an endpoint’s latency exceeds `ALERT_THRESHOLD_MS`.  
* **Custom theming:** `theme.json` lets you tweak colours, fonts, spacing, and simple Sass‑style helpers.  
* **Zero‑config endpoints:** Drop URLs into `config/endpoints.json` and the dashboard shows them automatically.

---

## Quick start

```bash
# Clone the repo
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies (npm or yarn)
npm install          # or yarn install

# Copy the env template and edit your settings
cp .env.example .env
# Open .env and adjust variables as needed

# In development – hot reload
npm run dev

# Production build & run
npm run build
npm start
```

Open <http://localhost:3000> in your browser to see the dashboard.

---

## Configuration

Create a `.env` file at the project root (a template is provided as `.env.example`).  

| Environment variable | Default | Description |
|-----------------------|---------|-------------|
| `POLL_INTERVAL_MS`   | `30000` | How often each endpoint is polled (milliseconds). |
| `ALERT_THRESHOLD_MS` | `1200`  | Latency (ms) that triggers an alert. |
| `SLACK_WEBHOOK`      | `""`    | Incoming Slack webhook URL (leave empty to disable). |
| `SMTP_HOST`          | `""`    | SMTP host for email alerts (leave empty to disable). |
| `SMTP_PORT`          | `587`   | SMTP port. |
| `SMTP_USER`          | `""`    | SMTP username. |
| `SMTP_PASS`          | `""`    | SMTP password. |
| `LOG_ROTATION`       | `false` | When `true`, deletes logs older than the retention period. |

Only one notification channel is required; if both Slack and SMTP are configured, alerts are sent to both.

---

## Endpoints

Add the URLs you wish to monitor in `config/endpoints.json`.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

Each URL appears as a separate card on the dashboard.

---

## Theming

Place a `theme.json` alongside `config/endpoints.json`.  
It supports basic `${VAR}` interpolation and simple SASS‑style helpers (`lighten`, `darken`, `rgba`, etc.).

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

See the bundled `theme.json` example for all available variables and helpers.

---

## Features

- **Real‑time WebSocket updates**
- **Heatmap of per‑endpoint latency**
- **Alerting via Slack, email, or both**
- **Optional log rotation**
- **Custom theming** (`theme.json`)
- **Zero‑config endpoints** – just drop URLs into JSON

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
src/dashboard.js        → Streams metrics to the UI via WebSocket
```

---

## Development

### Testing

```bash
npm test
```

The Jest suite covers polling logic, alert evaluation, and HTTP routes.

### Linting & Formatting

```bash
npm run lint     # ESLint
npm run format   # Prettier
```

Run both before submitting a pull request.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/your-feature`).  
3. Run `npm test` to validate changes.  
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
