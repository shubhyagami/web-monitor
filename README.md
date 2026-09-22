# web‑monitor

**web‑monitor** is a lightweight, real‑time dashboard that tracks the uptime, latency, and error rates of HTTP endpoints.  
It polls URLs on a user‑defined schedule and streams live updates to the browser via WebSockets.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)  
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Quick start

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or yarn install
cp .env.example .env
# Edit .env with your values
npm run dev          # for development
# or
npm run build
npm start
```

Open <http://localhost:3000> in your browser.

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Endpoints to monitor](#endpoints-to-monitor)
  - [UI theming](#ui-theming)
- [Alerting](#alerting)
- [Development](#development)
  - [Scripts](#scripts)
  - [Testing & linting](#testing--linting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Features

- **Real‑time updates** – WebSocket pushes with sub‑second latency.
- **Heatmap & charts** – Visualise latency trends over time.
- **Uptime & error statistics** – Percentages and status‑code breakdowns.
- **Alerting** – Slack webhook, SMTP email, or both.
- **Dynamic theming** – `theme.json` supports `$VAR` interpolation and SASS‑style helpers.
- **In‑memory storage** – No disk I/O, high‑performance polling.
- **Zero‑config discovery** – Endpoints are loaded from a simple JSON file.

---

## Architecture

```text
config/endpoints.json → src/poller.js → src/alerts.js → src/dashboard.js → Browser UI
```

- **Poller** – Periodically sends HTTP requests to URLs defined in `endpoints.json`.
- **Alerts** – Evaluates latency against `ALERT_THRESHOLD_MS` and triggers notifications.
- **Dashboard** – Emits metric updates to the browser through WebSockets.
- **Browser** – Displays real‑time heatmaps, charts, and status cards.

---

## Configuration

### Environment variables

Create a `.env` file in the project root (a template is provided as `.env.example`).

| Variable              | Default | Description |
|-----------------------|---------|-------------|
| `NODE_ENV`            | `development` | Runtime mode. |
| `PORT`                | `3000` | Port for the web server. |
| `POLL_INTERVAL_MS`   | `30000` | Poll frequency (ms). |
| `ALERT_THRESHOLD_MS` | `1200` | Latency threshold to trigger an alert (ms). |
| `SLACK_WEBHOOK`       | `""` | Slack incoming webhook URL (optional). |
| `SMTP_HOST`           | `""` | SMTP server host (optional). |
| `SMTP_PORT`           | `587` | SMTP server port. |
| `SMTP_USER`           | `""` | SMTP username (optional). |
| `SMTP_PASS`           | `""` | SMTP password (optional). |
| `LOG_ROTATION`        | `false` | If `true`, delete logs older than the configured retention period. |

> **Tip:** At least one of `SLACK_WEBHOOK` or SMTP settings must be supplied to receive alerts.

### Endpoints to monitor

Place a JSON array of URLs in `config/endpoints.json`. Each URL will create a card on the dashboard.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI theming

`config/theme.json` allows you to override colors, fonts, and other UI variables. The values support `${VAR}` interpolation and SASS‑style helpers like `lighten()`.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Alerting

Configure Slack and/or SMTP in the `.env` file. The alerting system will send a notification if a request latency exceeds `ALERT_THRESHOLD_MS`. It also logs alerts to the console for quick debugging.

---

## Development

### Available scripts

| Command          | Purpose |
|-----------------|---------|
| `npm run dev`   | Start the development server with hot reloading. |
| `npm run build` | Build a production bundle. |
| `npm run start` | Run the production server. |
| `npm run lint`  | Run ESLint checks. |
| `npm run format` | Format code with Prettier. |
| `npm test`      | Execute Jest test suite. |

### Testing & linting

Before submitting a PR, run:

```bash
npm test
npm run lint
```

All tests must pass and linting must be clean.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`.
2. Make your changes and run the test pool.
3. Commit with a clear message.
4. Push to your fork and open a Pull Request.

Please follow the project's coding style and conventions. Use the issue tracker for discussions or feature requests.

---

## Changelog

### v2.4.1 – 2026‑07‑14
- Added optional log rotation.
- Improved latency heatmap rendering.
- Fixed bug in `theme.json` variable parsing.

### v2.3.0 – 2026‑05‑02
- Integrated Slack webhook notifications.
- Added advanced dashboard theming via `theme.json`.

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
