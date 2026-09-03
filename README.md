# web‑monitor

A lightweight, real‑time dashboard for monitoring web‑application performance.  
It polls configured HTTP endpoints, records uptime and response times, visualises data, and can trigger alerts when thresholds are exceeded.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Build](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)  
![PRs welcome](https://img.shields.io/badge/PRs-welcome-orange)  

---

## Quick Start

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install
# copy the example env
cp .env.example .env
# edit .env to set your poll interval, alerts, etc.
npm run dev   # or npm start for production
```

Open <http://localhost:3000> to view the dashboard.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Theme file](#theme-file)
- [Usage](#usage)
  - [Dashboard](#dashboard)
  - [Alerting](#alerting)
  - [Log rotation](#log-rotation)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Running tests](#running-tests)
  - [Linting & formatting](#linting--formatting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

`web‑monitor` runs as a Node.js (≥18) process and performs the following:

1. **Polling**: Hits every URL listed in `config/endpoints.json` at a configurable interval.
2. **Metrics storage**: Keeps raw metrics in an in‑memory array (extendable to Redis or a file later).
3. **Dashboard**: Serves a responsive web UI on `localhost:3000` that updates automatically.
4. **Customization**: Appearance can be tuned via `config/theme.json`.
5. **Alerting**: Sends Slack messages or e‑mail if a response time exceeds `ALERT_THRESHOLD_MS`.
6. **Log pruning**: Optionally removes old log entries to keep the data set manageable.

---

## Features

- **Live dashboard** – real‑time view of all monitored URLs.  
- **Heatmap visualisation** – colour‑coded latency grid with hover tool‑tips.  
- **Alerting** – Slack webhook or SMTP e‑mail; thresholds configurable.  
- **Themeable** – JSON theme with support for environment variable interpolation (`$VAR`).  
- **Log rotation** – toggle‑based pruning of old log entries.  
- **Cross‑platform** – works on Windows, macOS, and Linux.  

---

## Architecture

```
┌───────────────────────┐
│  config/              │
│  ├─ theme.json        │
│  └─ endpoints.json   │
├───────────────────────┤
│  src/                 │
│  ├─ server.js         │
│  ├─ dashboard.js      │
│  ├─ poller.js         │
│  └─ alerts.js         │
├───────────────────────┤
│  public/              │
│  └─ static assets      │
├───────────────────────┤
│  .env (optional)     │
└───────────────────────┘
```

- `poller.js` performs the HTTP requests and records metrics.  
- `alerts.js` evaluates thresholds and triggers notifications.  
- `dashboard.js` serves the UI and pushes data to the browser via WebSocket.  

---

## Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# 2️⃣ Install dependencies
npm install
```

If you use Yarn, replace `npm install` with `yarn install`.

---

## Configuration

Create a `.env` file in the root of the project. A template is provided in `.env.example`.

### Environment variables

| Variable            | Default  | Purpose |
|----------------------|----------|--------|
| `POLL_INTERVAL_MS`  | `30000`  | Polling frequency in milliseconds. |
| `SLACK_WEBHOOK`     | `""`     | Incoming Slack webhook URL. |
| `ALERT_THRESHOLD_MS` | `1200`  | Response time (ms) that triggers an alert. |
| `LOG_ROTATION`      | `false`  | `true` enables automatic deletion of old logs. |
| `SMTP_HOST`         | `""`     | Optional SMTP host for e‑mail alerts. |
| `SMTP_PORT`         | `587`    | Optional SMTP port. |
| `SMTP_USER`         | `""`     | Optional SMTP username. |
| `SMTP_PASS`         | `""`     | Optional SMTP password. |

Only one alert channel is required – leaving the SMTP fields empty will disable e‑mail notifications.

### Theme file

`config/theme.json` overrides the default dashboard appearance. Environment variables can be referenced with `${VAR}` syntax. Example:

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

Place this file in the same directory as `endpoints.json`.

---

## Usage

### Dashboard

```bash
npm run dev   # development (hot reload)
# or
npm start      # production
```

Open <http://localhost:3000> to see live metrics. The page refreshes automatically every `POLL_INTERVAL_MS` milliseconds.

### Alerting

When a response time exceeds `ALERT_THRESHOLD_MS`, the application:

1. Posts a message to the configured Slack webhook.  
2. Sends an e‑mail using the SMTP settings if provided.

Typical Slack payload:

```
📢 *Alert*: `api.example.com` is slow (1540 ms) – threshold is 1200 ms.
```

### Log rotation

Set `LOG_ROTATION=true` in your `.env` file. Logs older than the retention period are removed automatically every hour.

---

## Development

### Prerequisites

- Node.js 18 or newer  
- npm or Yarn

### Running tests

```bash
npm test
```

Tests are written with Jest and cover polling logic, alert evaluation, and API routes.

### Linting & formatting

```bash
npm run lint   # ESLint
npm run format # Prettier
```

Run both before creating a pull request.

---

## Contributing

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feat/your-feature`.  
3. Run tests: `npm test`.  
4. Commit your changes with a descriptive message.  
5. Push: `git push -u origin feat/your-feature`.  
6. Open a PR – describe the issue and the solution.

All contributors must follow the linting rules and keep the code style consistent.

---

## Changelog

**v2.4.1** – 2026‑07‑14  
- Added log rotation toggle.  
- Improved heatmap responsiveness.  
- Fixed parsing of theme variables.

**v2.3.0** – 2026‑05‑02  
- Introduced Slack alert support.  
- Added advanced dashboard theming.

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
