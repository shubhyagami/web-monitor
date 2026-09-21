# web‑monitor

Web‑monitor is a lightweight, real‑time dashboard for tracking the uptime, latency, and error rates of HTTP endpoints.  
It polls URLs at user‑defined intervals, keeps metrics in memory, and streams live updates to the browser via WebSockets.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)  
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)  

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Monitoring Endpoints](#monitoring-endpoints)
  - [UI Theming](#ui-theming)
- [Architecture](#architecture)
- [Development](#development)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Features

- **Real‑time monitoring** – WebSocket‑based updates with sub‑second latency.
- **Heatmap analytics** – Visual representation of latency across time.
- **Uptime & error tracking** – Percentage metrics and HTTP status breakdown.
- **Alerting** – Slack webhook, SMTP email, or a combination.
- **Dynamic theming** – `theme.json` supports SASS‑style helpers and environment variable interpolation.
- **In‑memory storage** – Minimal disk I/O for high‑performance polling.
- **Zero‑configuration** – Discover endpoints via a simple JSON file.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install deps
npm install   # or yarn

# Copy env template
cp .env.example .env
# Edit .env with your values
```

### Run

```bash
# Development (hot reloading)
npm run dev

# Production build
npm run build
npm start
```

Open your browser at `http://localhost:3000` to view the dashboard.

---

## Configuration

### Environment Variables

Create or edit the `.env` file in the project root:

| Variable         | Default   | Description                                     |
|------------------|-----------|-------------------------------------------------|
| `POLL_INTERVAL_MS` | `30000`  | Time (ms) between polls for each endpoint.      |
| `ALERT_THRESHOLD_MS` | `1200` | Latency threshold that triggers an alert.       |
| `SLACK_WEBHOOK` | `""`        | Incoming Slack webhook URL (optional).           |
| `SMTP_HOST`     | `""`        | SMTP server host (optional).                     |
| `SMTP_PORT`     | `587`        | SMTP server port.                                |
| `SMTP_USER`     | `""`        | SMTP username.                                   |
| `SMTP_PASS`     | `""`        | SMTP password.                                   |
| `LOG_ROTATION`   | `false`     | Delete logs older than the retention period.     |

> **Tip:** At least one of Slack or SMTP must be configured to receive alerts.

### Monitoring Endpoints

List the URLs you want to monitor in `config/endpoints.json`. Each URL will produce its own card on the dashboard.

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI Theming

Create a `theme.json` file in `config/` to override colors, fonts, and other UI variables. The system supports `${VAR}` interpolation and SASS‑style helpers like `lighten()`.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Architecture

```text
config/endpoints.json → src/poller.js → src/alerts.js → src/dashboard.js → Browser UI
```

- **Poller** – Periodically sends HTTP requests to defined URLs.
- **Alerts** – Evaluates latency against thresholds and triggers notifications.
- **Dashboard** – Emits metric updates through WebSockets to the browser.
- **Browser** – Displays real‑time heatmaps, charts, and status cards.

---

## Development

### Available Scripts

| Script        | Purpose                                              |
|---------------|------------------------------------------------------|
| `npm run dev` | Start the dev server with hot reloading             |
| `npm run build` | Build a production bundle                           |
| `npm run lint` | Run ESLint checks                                    |
| `npm run format` | Format code with Prettier                           |
| `npm test`    | Execute Jest test suite                               |

### Quality Assurance

Before opening a PR:

```bash
npm test
npm run lint
```

All tests must pass and linting must be clean.

---

## Contributing

1. Fork the repo and create a feature branch:  
   `git checkout -b feat/your-feature`
2. Implement changes and run `npm test` to verify.
3. Commit with clear, concise messages.
4. Push to your fork and open a Pull Request.

Please adhere to the project's coding style and conventions.

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
