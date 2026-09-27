# web-monitor

**web-monitor** is a lightweight dashboard for monitoring the uptime, latency, and error rates of HTTP endpoints. It polls URLs on a configurable schedule and streams live results to the browser over WebSockets.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Table of contents

- [Getting started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Endpoints to monitor](#endpoints-to-monitor)
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

Requires Node.js and npm (or Yarn) installed locally.

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install            # or yarn install
cp .env.example .env   # fill in your values
npm run dev            # development server with hot reloading

# Production build
npm run build
npm start
```

Then open <http://localhost:3000> in your browser.

---

## Features

- **Real-time updates** — metrics are pushed to the browser over WebSockets with sub-second latency.
- **Charts and heatmaps** — visualize latency, uptime, and error-rate trends at a glance.
- **Statistical summaries** — uptime percentage and status-code distribution per endpoint.
- **Alerting** — Slack webhook, SMTP email, or both.
- **Theming** — customize colors and fonts via `config/theme.json`, with `${VAR}` interpolation.
- **Zero-config storage** — in-memory storage, no database or disk I/O required.
- **Simple discovery** — endpoints are defined in a single JSON file.

---

## Architecture

```
config/endpoints.json → src/poller.ts → src/alerts.ts → src/dashboard.ts → Browser UI
```

| Layer | Responsibility |
|-------|----------------|
| **Poller** | Periodically requests each URL defined in `endpoints.json`. |
| **Alerts** | Compares latency against `ALERT_THRESHOLD_MS` and triggers notifications. |
| **Dashboard** | Publishes metric updates to the browser over WebSocket. |
| **UI** | Renders heatmaps, charts, and status cards. |

---

## Configuration

### Environment variables

Copy `.env.example` to `.env` in the project root and adjust the values.

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Runtime mode. |
| `PORT` | `3000` | Web server port. |
| `POLL_INTERVAL_MS` | `30000` | How often endpoints are polled, in milliseconds. |
| `ALERT_THRESHOLD_MS` | `1200` | Latency threshold (ms) that triggers an alert. |
| `SLACK_WEBHOOK` | `""` | Slack incoming webhook URL (optional). |
| `SMTP_HOST` | `""` | SMTP server host (optional). |
| `SMTP_PORT` | `587` | SMTP server port. |
| `SMTP_USER` | `""` | SMTP username (optional). |
| `SMTP_PASS` | `""` | SMTP password (optional). |
| `LOG_ROTATION` | `false` | When `true`, deletes logs older than the retention period. |

> **Tip:** Configure at least one alert method (`SLACK_WEBHOOK` or SMTP settings) to receive notifications.

### Endpoints to monitor

Add a JSON array of URLs to `config/endpoints.json`. Each URL appears as a card on the dashboard.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI theming

`config/theme.json` overrides UI variables. Values support `${VAR}` interpolation and SASS-style helpers such as `lighten()`.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Alerting

When a request latency exceeds `ALERT_THRESHOLD_MS`, web-monitor sends:

- a Slack message, if `SLACK_WEBHOOK` is set;
- an email through the configured SMTP server.

Alerts are also logged to the console for easier debugging.

---

## Development

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Starts the dev server with hot reloading. |
| `npm run build` | Builds a production bundle. |
| `npm start` | Runs the production server. |
| `npm run lint` | Runs ESLint. |
| `npm run format` | Formats code with Prettier. |
| `npm test` | Runs the Jest test suite. |

### Testing and linting

```bash
npm test
npm run lint
```

All tests must pass and linting must be clean before a pull request is submitted.

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`.
2. Make your changes, run the test suite, and keep the lint clean.
3. Commit with a clear message.
4. Push to your fork and open a pull request.

Please follow the project's coding style, and open an issue first to discuss larger changes or feature requests.

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
