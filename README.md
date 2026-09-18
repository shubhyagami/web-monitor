[K[2m  [2mmodel openai/gpt-oss-20b failed, trying next...[0m[0m
[K[2m  [2mmodel openai/gpt-oss-120b failed, trying next...[0m[0m
# web-monitor

Web-monitor is a lightweight, real-time dashboard for tracking the uptime and latency of HTTP endpoints. It polls configured URLs, maintains metrics in memory, and streams live updates to the browser via WebSockets.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![Version](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)
![CI](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

---

## Features

- **Real-time Monitoring**: Low-latency metric streaming using WebSockets.
- **Visual Analytics**: Includes latency heatmaps, uptime percentages, and error rate tracking.
- **Flexible Alerting**: Instant notifications via Slack, SMTP email, or both.
- **Custom Theming**: Dynamic UI customization via `theme.json` with SASS-style color helpers.
- **High Performance**: In-memory metric storage to minimize disk I/O.
- **Simple Setup**: JSON-based configuration for endpoint discovery.

---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your specific credentials and thresholds
```

### Running the Application
```bash
# Local development with hot reloading
npm run dev

# Production build and start
npm run build
npm start
```
Once the server is running, access the dashboard at `http://localhost:3000`.

---

## Configuration

### Environment Variables
Configure your application settings in the `.env` file.

| Variable | Default | Description |
| :--- | :--- | :--- |
| `POLL_INTERVAL_MS` | `30000` | Time between polls for each endpoint. |
| `ALERT_THRESHOLD_MS` | `1200` | Latency threshold that triggers an alert. |
| `SLACK_WEBHOOK` | `""` | Incoming Slack webhook URL. |
| `SMTP_HOST` | `""` | SMTP server host. |
| `SMTP_PORT` | `587` | SMTP server port. |
| `SMTP_USER` | `""` | SMTP username. |
| `SMTP_PASS` | `""` | SMTP password. |
| `LOG_ROTATION` | `false` | Automatically delete logs older than the retention period. |

> **Note:** At least one notification channel (Slack or SMTP) must be configured to receive alerts.

### Monitoring Endpoints
Define the URLs you wish to track in `config/endpoints.json`. Each entry will generate a dedicated monitoring card on the dashboard:

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

### UI Theming
Customize the dashboard visuals by creating a `theme.json` file in the `config/` directory. The system supports `${VAR}` interpolation and standard SASS-style color helpers:

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

---

## Architecture

The application uses a unidirectional data flow to ensure consistency:

`config/endpoints.json` $\rightarrow$ `src/poller.js` (HTTP Polling) $\rightarrow$ `src/alerts.js` (Threshold Evaluation) $\rightarrow$ `src/dashboard.js` (WebSocket Stream) $\rightarrow$ **Browser UI**

---

## Development

### Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot reloading |
| `npm run build` | Compiles the production bundle |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run format` | Applies Prettier formatting |
| `npm test` | Executes the Jest test suite |

### Quality Assurance
Please ensure all tests pass and linting is clean before submitting a pull request:
```bash
npm test
npm run lint
```

---

## Contributing

1. Fork the repository and create your feature branch: `git checkout -b feat/your-feature`.
2. Implement your changes and verify they pass with `npm test`.
3. Commit your changes with clear, concise messages.
4. Push to your fork and submit a Pull Request.

---

## Changelog

### v2.4.1 (2026-07-14)
- Added optional log rotation for better disk management.
- Improved responsiveness and rendering of the latency heatmap.
- Fixed a bug in the `theme.json` variable parsing logic.

### v2.3.0 (2026-05-02)
- Integrated Slack webhook notifications.
- Introduced advanced dashboard theming via `theme.json`.

---

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
