[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# web‑monitor

**web‑monitor** is a lightweight real‑time dashboard for watching the uptime, latency, and error rates of HTTP endpoints. It polls URLs on a configurable schedule and streams live updates to the browser through WebSockets.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Table of contents

- [Quick start](#quick-start)
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

## Quick start

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or yarn install
cp .env.example .env
# Edit .env with your values
npm run dev          # development build with hot reloading
# For a production build:
npm run build
npm start
```

Open <http://localhost:3000> in your browser.

---

## Features

- **Real‑time metrics** – WebSocket push updates with sub‑second latency.
- **Heatmaps & charts** – Visualise latency, uptime, and error trends.
- **Statistical summaries** – Uptime percentage, status‑code distribution.
- **Alerting** – Slack webhook, SMTP email, or both.
- **Theming** – `theme.json` supports `${VAR}` interpolation and SASS‑style helpers.
- **In‑memory storage** – No disk I/O, quick polling.
- **Simple discovery** – Endpoints loaded from a JSON file.

---

## Architecture

```
config/endpoints.json → src/poller.ts → src/alerts.ts → src/dashboard.ts → Browser UI
```

| Layer | Responsibility |
|-------|----------------|
| **Poller** | Periodically requests URLs defined in `endpoints.json`. |
| **Alerts** | Evaluates latency against `ALERT_THRESHOLD_MS` and triggers notifications. |
| **Dashboard** | Publishes metric updates to the browser over WebSocket. |
| **UI** | Renders heatmaps, charts, and status cards in the browser. |

---

## Configuration

### Environment variables

Create a `.env` file in the root (template: `.env.example`).

| Variable              | Default         | Description |
|-----------------------|-----------------|-------------|
| `NODE_ENV`            | `development`   | Runtime mode. |
| `PORT`                | `3000`          | Web server port. |
| `POLL_INTERVAL_MS`    | `30000`         | Frequency of polling (milliseconds). |
| `ALERT_THRESHOLD_MS`  | `1200`          | Latency threshold (ms) that triggers an alert. |
| `SLACK_WEBHOOK`       | `""`            | Slack incoming webhook URL (optional). |
| `SMTP_HOST`           | `""`            | SMTP server host (optional). |
| `SMTP_PORT`           | `587`           | SMTP server port. |
| `SMTP_USER`           | `""`            | SMTP username (optional). |
| `SMTP_PASS`           | `""`            | SMTP password (optional). |
| `LOG_ROTATION`       | `false`         | If `true`, delete logs older than the retention period. |

> **Tip:** Provide at least one alert method (`SLACK_WEBHOOK` or SMTP settings) to receive notifications.

### Endpoints to monitor

Place a JSON array of URLs in `config/endpoints.json`. Each URL creates a card on the dashboard.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI theming

`config/theme.json` lets you override UI variables. Values support `${VAR}` interpolation and SASS‑style helpers like `lighten()`.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Alerting

When a request latency exceeds `ALERT_THRESHOLD_MS`, the system sends:
- A Slack message (if `SLACK_WEBHOOK` is set).
- An email via the provided SMTP configuration.

All alerts are also logged to the console for immediate debugging.

---

## Development

### Scripts

| Command          | Purpose |
|-----------------|---------|
| `npm run dev`   | Starts the dev server with hot reloading. |
| `npm run build`| Builds a production bundle. |
| `npm start`     | Runs the production server. |
| `npm run lint`  | Runs ESLint. |
| `npm run format`| Formats code with Prettier. |
| `npm test`      | Runs the Jest test suite. |

### Testing and linting

```bash
npm test
npm run lint
```

All tests must pass and linting must be clean before submitting a pull request.

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`.
2. Make your changes, run the test suite, and keep linting clean.
3. Commit with a clear message.
4. Push to your fork and open a pull request.

Follow the project's coding style and open issues for discussion or feature requests.

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
