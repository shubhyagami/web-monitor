[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# web‑monitor

A lightweight dashboard that watches the uptime, latency, and error rate of any HTTP(S) endpoint.  
It talks to the browser over WebSockets so you get real‑time updates without a database or a persistent storage layer.

![Node.js](https://img.shields.io/badge/Node.js-%23339933?logo=nodejs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)

---

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running](#running)
- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Endpoints](#endpoints-to-monitor)
  - [UI theming](#ui-theming)
- [Alerting](#alerting)
- [Development](#development)
  - [Scripts](#scripts)
  - [Testing and linting](#testing-and-linting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm (or Yarn)

### Installation

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or `yarn install`
cp .env.example .env # customize the values
```

### Running

```bash
# Development
npm run dev          # Hot‑reload server, opens http://localhost:3000

# Production build
npm run build
npm start
```

Open <http://localhost:3000> in a browser after the server starts.

---

## Features

- **Real‑time metrics** – WebSocket pushes keep the dashboard up to date with sub‑second latency.
- **Heatmaps & charts** – Visualise latency, uptime, and error‑rate trends.
- **Statistical summaries** – Uptime percentage and status‑code distribution per endpoint.
- **Alerts** – Slack webhook, SMTP email, or both.
- **Theming** – Customise colors, fonts, and layout via `config/theme.json` (supports `${VAR}` interpolation).
- **Zero‑config storage** – All data lives in memory; no disk or database required.
- **Simple discovery** – A single JSON file lists every endpoint to watch.

---

## Architecture

```
config/endpoints.json → src/poller.ts → src/alerts.ts → src/dashboard.ts → Browser UI
```

| Layer       | Responsibility |
|-------------|------------------|
| **Poller**  | Sends HTTP requests on a configurable schedule. |
| **Alerts**  | Checks latency against `ALERT_THRESHOLD_MS` and fires notifications. |
| **Dashboard** | Publishes metric updates to the browser via WebSocket. |
| **UI**      | Renders charts, heatmaps, and status cards. |

---

## Configuration

### Environment variables

| Variable          | Default | Purpose |
|-------------------|---------|---------|
| `NODE_ENV`        | `development` | Runtime mode. |
| `PORT`             | `3000` | HTTP server port. |
| `POLL_INTERVAL_MS` | `30000` | Polling frequency. |
| `ALERT_THRESHOLD_MS` | `1200` | Latency threshold that triggers an alert. |
| `SLACK_WEBHOOK`   | `""` | Slack incoming webhook URL. |
| `SMTP_HOST`       | `""` | SMTP server host. |
| `SMTP_PORT`       | `587` | SMTP server port. |
| `SMTP_USER`       | `""` | SMTP username. |
| `SMTP_PASS`       | `""` | SMTP password. |
| `LOG_ROTATION`    | `false` | Trim logs older than the retention period. |

> **Tip** – Configure at least one alert method (`SLACK_WEBHOOK` or the SMTP settings) to receive notifications.

### Endpoints to monitor

Create a JSON array file at `config/endpoints.json`. Each string in the array becomes a card on the dashboard.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI theming

`config/theme.json` contains CSS variables that override the default theme. Variables can reference other variables.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Alerting

If a request’s latency exceeds `ALERT_THRESHOLD_MS`:

1. A Slack message is sent if `SLACK_WEBHOOK` is set.
2. An email is dispatched via the configured SMTP server.
3. The alert is logged to the console for debugging.

---

## Development

### Scripts

| Command       | Purpose |
|---------------|---------|
| `npm run dev` | Start dev server with hot reloading. |
| `npm run build` | Create a production bundle. |
| `npm start`   | Run the production server. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format code with Prettier. |
| `npm test`    | Execute Jest tests. |

### Testing and linting

```bash
npm test
npm run lint
```

All tests must pass and linting must be clean before submitting a pull request.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`.
2. Make your changes, run the tests, and keep linting clean.
3. Commit with a descriptive message.
4. Push to your fork and open a pull request.

For larger changes, open an issue first to discuss the scope.

---

## Changelog

### v2.4.1 — 2026-07-14
- Added optional log rotation.
- Improved latency heatmap rendering.
- Fixed a bug in `theme.json` variable parsing.

### v2.3.0 — 2026-05-02
- Integrated Slack webhook notifications.
- Added advanced dashboard theming via `theme.json`.

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
