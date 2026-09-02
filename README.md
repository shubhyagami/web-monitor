# web‑monitor

**A lightweight, real‑time dashboard for monitoring web‑application performance.**  
It polls HTTP endpoints, records uptime and response times, visualises the data, and can trigger alerts when thresholds are exceeded.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Build](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg)  
![PRs welcome](https://img.shields.io/badge/PRs-welcome-orange)  
![Maintained by](https://img.shields.io/badge/maintained%20by-shubhyagami-blue)

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Theme](#theme)
- [Usage](#usage)
  - [Running the dashboard](#running-the-dashboard)
  - [Alerting](#alerting)
  - [Log rotation](#log-rotation)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
  - [Running tests](#running-tests)
  - [Linting and formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

`web‑monitor` is a Node.js application that:

- Polls a list of endpoints at a configurable interval.
- Stores the raw metrics in an in‑memory store (Puppeteer‑like or simple array).
- Serves a responsive dashboard over `http://localhost:3000`.
- Allows customization of layout, colours and fonts via a JSON file.
- Sends Slack messages or e‑mail notifications when a response time exceeds a threshold.
- Supports automatic log pruning through an environment variable.

The project is written in JavaScript (ES‑6+) and is fully typed with JSDoc. It can run on any system that supports Node 18+.

---

## Features

| Feature | Description |
|---------|-------------|
| **Live dashboard** | View current metrics for all monitored URLs in real time. |
| **Latency heatmaps** | Quickly spot slow endpoints with colour‑coded grids and hover details. |
| **Alerting** | Send Slack or e‑mail notifications when thresholds are breached. |
| **Theming** | Override colours, fonts and layout in `config/theme.json`. |
| **Dynamic themes** | Reference environment variables in the theme file (`$VAR`). |
| **Log rotation** | Enable `LOG_ROTATION=true` to keep logs tidy. |
| **Configurable polling** | Set `POLL_INTERVAL_MS` to control how often endpoints are hit. |
| **Cross‑platform** | Works on Windows, macOS and Linux. |

---

## Architecture

```text
┌───────────────────────┐
│  config/              │
│  ├─ theme.json        │
│  └─ endpoints.json   │
├───────────────────────┤
│  src/                 │
│  ├─ server.js         │
│  ├─ dashboard.js     │
│  ├─ poller.js         │
│  └─ alerts.js        │
├───────────────────────┤
│  public/               │
│  └─ static assets     │
├───────────────────────┤
│  .env (optional)      │
└───────────────────────┘
```

* `endpoints.json` lists the URLs to monitor.  
* `poller.js` performs the HTTP requests.  
* `alerts.js` evaluates thresholds and publishes to Slack/email.  
* `dashboard.js` serves the live UI.  

---

## Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# 2️⃣ Install dependencies
npm install
```

> **Tip** – If you prefer Yarn:
> ```bash
> yarn install
> ```

---

## Configuration

`web-monitor` uses a handful of environment variables. Create a `.env` file in the project root (see `.env.example` for a template).

### Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `POLL_INTERVAL_MS` | `30000` | Polling interval in milliseconds. |
| `SLACK_WEBHOOK` | `""` | Incoming Slack webhook URL for alerts. |
| `ALERT_THRESHOLD_MS` | `1200` | Maximum acceptable response time before an alert is sent. |
| `LOG_ROTATION` | `false` | `true` to enable automatic pruning of old log files. |
| `SMTP_HOST` | `""` | Optional SMTP host for e‑mail alerts. |
| `SMTP_PORT` | `587` | Optional SMTP port. |
| `SMTP_USER` | `""` | Optional SMTP username. |
| `SMTP_PASS` | `""` | Optional SMTP password. |

> **Note** – If you only want Slack alerts, leave SMTP variables empty; only one method of alerting is required.

### Theme

Place a `config/theme.json` file next to `config/endpoints.json` to override the default dashboard appearance. The file supports environment variables using `$VAR` syntax.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Usage

### Running the dashboard

```bash
npm run dev   # development mode (hot reload)
# or
npm start      # production mode
```

Open <http://localhost:3000> in your browser. The UI refreshes automatically every `POLL_INTERVAL_MS` milliseconds.

### Alerting

When a response time exceeds `ALERT_THRESHOLD_MS`, the application will:

1. Post a message to the configured Slack webhook.
2. Send an e‑mail using the SMTP settings (if provided).

A typical Slack payload looks like:

```
📢 *Alert*: `api.example.com` is slow (1540 ms) – threshold is 1200 ms.
```

### Log rotation

Set `LOG_ROTATION=true` in your `.env`. Old log entries beyond a configurable retention period will be automatically removed every hour.

---

## Development

### Prerequisites

- Node.js 18 or newer
- npm or yarn

### Getting started

```bash
# After cloning and npm install
npm run dev
```

The codebase uses ESLint + Prettier for linting and formatting.

### Running tests

```bash
npm test
```

All tests are written with Jest and cover polling, alerting logic, and API endpoints.

### Linting and formatting

```bash
npm run lint   # run ESLint
npm run format # run Prettier
```

---

## Contributing

1. **Open an issue** – describe bugs, improvements or ideas.  
2. **Create a feature branch** – `git checkout -b feat/your-feature`.  
3. **Run tests** – `npm test` to ensure everything passes.  
4. **Push your branch** – `git push -u origin feat/your-feature`.  
5. **Open a PR** – include a clear description of what you changed and why.

All contributors must adhere to the project's code style and run the linter before submitting a PR.

---

## Changelog

### v2.4.1  (2026‑07‑14)

- Added log rotation toggle.  
- Improved heatmap responsiveness.  
- Fixed theme variable parsing.  

### v2.3.0  (2026‑05‑02)

- Introduced Slack alert support.  
- Added advanced dashboard theming.  

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
