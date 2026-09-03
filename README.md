# web‑monitor

A lightweight, real‑time dashboard for monitoring web‑application performance.  
It polls configured HTTP endpoints, records uptime and response times, visualises data, and can trigger alerts when thresholds are exceeded.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![MIT License](https://img.shields.io/badge/license-MIT-blue)  
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)  
![PRs welcome](https://img.shields.io/badge/PRs-welcome-orange)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18  
- **npm** (or **Yarn**)  

### Install

```bash
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install          # or yarn install
```

### Configure

Create a `.env` file at the root. A template is provided as `.env.example`.

```bash
cp .env.example .env
# Edit the file to set the values you need
```

#### Environment variables

| Variable           | Default   | Purpose                                                  |
|--------------------|-----------|----------------------------------------------------------|
| `POLL_INTERVAL_MS`| `30000`   | Frequency of polling in milliseconds                    |
| `SLACK_WEBHOOK`    | `""`      | Incoming Slack webhook URL                               |
| `ALERT_THRESHOLD_MS` | `1200` | Alert threshold (ms) that triggers notifications        |
| `LOG_ROTATION`     | `false`   | `true` enables automatic deletion of old logs             |
| `SMTP_HOST`        | `""`      | SMTP host for e‑mail alerts                              |
| `SMTP_PORT`        | `587`     | SMTP port                                                |
| `SMTP_USER`        | `""`      | SMTP username                                            |
| `SMTP_PASS`        | `""`      | SMTP password                                            |

Only one alert channel is required – leaving the SMTP fields empty disables e‑mail notifications.

#### Theme file

Place a `theme.json` in `config/` alongside `endpoints.json`. The JSON supports environment variable interpolation via `${VAR}`.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## 📦 Usage

Run the application in development mode (hot reload) or in production:

```bash
npm run dev   # development
# or
npm start     # production
```

Open <http://localhost:3000> to view the live dashboard. The page updates automatically every `POLL_INTERVAL_MS` milliseconds.

### Dashboard

* Real‑time view of all monitored URLs  
* Heatmap visualisation of latency grid with hover‑tooltips  
* Configurable via environment variables and `theme.json`

### Alerting

When a response time exceeds `ALERT_THRESHOLD_MS`, the application:

1. Posts a message to the configured Slack webhook.  
2. Sends an e‑mail using the provided SMTP settings (if configured).

Typical Slack payload:

```
📢 *Alert*: `api.example.com` is slow (1540 ms) – threshold is 1200 ms.
```

### Log rotation

Set `LOG_ROTATION=true` in your `.env`. Logs older than the retention period are purged automatically every hour.

---

## 📐 Architecture

```
├─ config/
│  ├─ endpoints.json
│  └─ theme.json
├─ public/
│  └─ static assets
├─ src/
│  ├─ server.js      # Express/WebSocket server
│  ├─ poller.js      # HTTP polling logic
│  ├─ alerts.js      # Threshold evaluation & notification
│  └─ dashboard.js   # UI service
├─ .env              # Optional, overrides defaults
└─ package.json
```

* `poller.js` performs the HTTP requests and records metrics in memory.  
* `alerts.js` evaluates thresholds and triggers notifications.  
* `dashboard.js` streams data to the browser via WebSocket.

---

## 🛠️ Development

### Running tests

```bash
npm test
```

Tests are written in Jest and cover polling, alerting, and API routes.

### Linting & Formatting

```bash
npm run lint     # ESLint
npm run format   # Prettier
```

Run both before submitting a pull request.

---

## 🤝 Contributing

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feat/your-feature`.  
3. Run the tests: `npm test`.  
4. Commit with a clear, descriptive message.  
5. Push and open a pull request.  
6. Follow linting rules – code style must match the repo’s configuration.

All contributions are welcome – just keep the code clean and tests passing.

---

## 🗒️ Changelog

**v2.4.1** – 2026‑07‑14  
- Added log rotation toggle.  
- Improved heatmap responsiveness.  
- Fixed theme variable parsing.

**v2.3.0** – 2026‑05‑02  
- Introduced Slack alert support.  
- Added advanced dashboard theming.

---

## 📄 License

MIT © [shubhyagami](https://github.com/shubhyagami)
