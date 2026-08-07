# web-monitor

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.4.1-blueviolet)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)

A lightweight, real-time web monitoring dashboard built with JavaScript and Node.js. It tracks endpoint uptime, visualizes response times via latency heatmaps, and sends alerts to keep you informed of degradations.

## Features

- **Real-time Dashboard:** Live metrics for all monitored URLs.
- **Latency Heatmaps:** Interactive color-coded grid to instantly spot slow endpoints.
- **Custom Alerts:** Integrate with Slack or email to receive notifications when response times exceed defined thresholds.
- **Theming Support:** Customize dashboard colors and layout by dropping a `theme.json` file into the `config/` directory.
- **Log Rotation:** Keep historical data manageable by enabling `LOG_ROTATION=true` in your environment.

## Getting Started

### Prerequisites

- Node.js (v18, v20, or v22)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shubhyagami/web-monitor.git
   cd web-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser to view live metrics immediately.

## Usage Example: SaaS Uptime Monitoring

Deploy `web-monitor` as an internal health-check for your customer-facing SaaS product. Configure it to poll your critical endpoints every 30 seconds, set response-time thresholds, and connect the event stream to a Slack webhook. Your team gets alerted the moment a page starts to degrade, while the latency heatmaps help pinpoint which regions are experiencing slowdowns before they impact users.

## Tips

- **Dynamic Secrets:** Use `$VAR` syntax in `theme.json` to safely reference environment variables for API keys.
- **Historical Data:** Enable `LOG_ROTATION=true` in your environment to automatically prune old logs and keep data storage lean.

## Changelog

### v2.4.1 — 2026-08-06
- **Interactive Latency Heatmaps:** Hover over any cell to see exact response time, timestamp, and HTTP status code.
- **Environment Variable Expansion:** Added support for `$VAR` syntax in `theme.json`.
- **Bugfix:** Fixed an issue where the dashboard would occasionally miss updates during daylight saving time transitions.

## Contributing

Contributions are welcome! Before opening a pull request, please follow these steps:

1. **Open an Issue:** Describe the bug or feature request to get feedback and a case number.
2. **Fork and Branch:** Fork the repo and create a feature branch from `main` (e.g., `git checkout -b feat/your-idea`).
3. **Run Tests:** Ensure all tests pass across supported Node versions (18, 20, 22) by running:
   ```bash
   npm test
   ```
4. **Submit a PR:** Open a pull request against the `main` branch with a clear description of your changes.

---

*May your response times be low and your uptime high.*
