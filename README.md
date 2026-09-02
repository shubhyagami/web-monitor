# web-monitor

**A lightweight, real‑time dashboard for monitoring web‑application performance.**  
It polls endpoints for uptime and response times, visualises the data, and can trigger custom alerts when thresholds are crossed.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Contributions](https://img.shields.io/badge/PRs-welcome-orange)  
![Maintained by](https://img.shields.io/badge/Maintained%20by-shubhyagami-blue)

---

## Features

- **Live dashboard** – view current metrics for all monitored URLs.  
- **Latency heatmaps** – instantly spot slow endpoints with color‑coded grids and hover details.  
- **Custom alerts** – send Slack messages or e‑mail notifications when thresholds are violated.  
- **Theming** – customize colors, fonts, and layout via `config/theme.json`.  
- **Log rotation** – enable `LOG_ROTATION=true` to automatically prune old logs.  
- **Dynamic themes** – reference environment variables in `theme.json` with `$VAR` syntax.

---

## Getting Started

```bash
# 1️⃣ Clone & install
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor
npm install

# 2️⃣ Create a .env file (see Config section for variables)
cp .env.example .env
# Fill in the placeholders

# 3️⃣ Start the development server
npm run dev
```

Open `http://localhost:3000` to see the dashboard in action.

---

## Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `POLL_INTERVAL_MS` | How often endpoints are polled (in milliseconds). | `30000` |
| `SLACK_WEBHOOK` | Incoming Slack webhook URL for alerts. | `https://hooks.slack.com/services/...` |
| `ALERT_THRESHOLD_MS` | Maximum acceptable response time before an alert is sent. | `1200` |
| `LOG_ROTATION` | `true` to enable automatic log rotation. | `true` |

**Theme**

Place a `config/theme.json` file to override default colors and layout. The file supports environment variables using `$VAR` syntax.

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Example Use‑Case

Deploy `web-monitor` as an internal health‑check for a SaaS product:

1. Poll critical endpoints every 30 seconds.  
2. Set a response‑time threshold of 1 second.  
3. Route alerts to a dedicated Slack channel for rapid incident response.

---

## Contributing

1. **Open an issue** – describe bugs or feature ideas.  
2. **Fork & branch** – create a feature branch from `main` (`git checkout -b feat/myp-feature`).  
3. **Run tests** – ensure everything works on Node 18, 20, and 22.  
   ```bash
   npm test
   ```  
4. **Submit a PR** – include a clear description of your changes.

---

## Changelog (excerpt)

- **2.4.1** – Added log rotation toggle, improved heatmap responsiveness, and fixed theme variable parsing.  
- **2.3.0** – Introduced Slack alert support and enhanced dashboard theming.

---

May your response times stay low and your uptime high.
