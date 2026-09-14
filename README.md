# web‑monitor

A lightweight dashboard for real‑time monitoring of web‑application uptime and latency.  
It polls HTTP endpoints, keeps metrics in memory, streams updates to a browser, and
sends alerts when thresholds are exceeded.

![](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![](https://img.shields.io/github/v/tag/shubhyagami/web-monitor?label=version)
![](https://github.com/shubhyagami/web-monitor/actions/workflows/ci.yml/badge.svg?branch=main)
![](https://img.shields.io/badge/license-MIT-blue)
![](https://img.shields.io/badge/coverage-100%25-brightgreen)

--- 

## Table of contents

- [Getting started](#getting-started)
- [Configuration](#configuration)
  - [Environment variables](#environment-variables)
  - [Endpoints](#endpoints)
  - [Theming](#theming)
- [Features](#features)
- [Architecture](#architecture)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Testing](#testing)
  - [Linting & formatting](#linting--formatting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

--- 

## Getting started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies
npm install          # or yarn install

# Create the environment configuration
cp .env.example .env
# Edit .env as needed

# Run in development mode (hot reload)
npm run dev

# Build and run a production instance
npm run build
npm start
```

Open <http://localhost:3000> to view the live dashboard.

--- 

## Configuration

### Environment variables

Create a `.env` file in the project root. The template below shows the available options:

| Variable            | Default | Description                                                      |
|---------------------|---------|------------------------------------------------------------------|
| `POLL_INTERVAL_MS`  | `30000` | Time (ms) between successive polls of each endpoint.               |
| `ALERT_THRESHOLD_MS` | `1200` | Latency (ms) that triggers an alert.                               |
| `SLACK_WEBHOOK`     | `""`    | Incoming Slack webhook URL (leave empty to disable).             |
| `SMTP_HOST`         | `""`    | SMTP host for email alerts (leave empty to disable).             |
| `SMTP_PORT`         | `587`   | SMTP port.                                                       |
| `SMTP_USER`         | `""`    | SMTP username.                                                   |
| `SMTP_PASS`         | `""`    | SMTP password.                                                   |
| `LOG_ROTATION`      | `false` | If `true`, delete logs older than the retention period.          |

A minimum of one notification channel (Slack **or** email) must be configured for alerts to be sent.

### Endpoints

Define the URLs you want to monitor in `config/endpoints.json`:

```json
[
  "https://example.com",
  "https://api.example.org/health"
]
```

Each URL appears as an independent card on the dashboard.

### Theming

Add a `theme.json` file next to `config/endpoints.json`. The file supports `${VAR}` interpolation and simple SASS‑style helpers (`lighten`, `darken`, `rgba`, etc.):

```json
{
  "primaryColor": "#1e90ff",
  "fontFamily": "Arial, sans-serif",
  "gridBackground": "lighten($primaryColor, 30%)"
}
```

See the bundled `theme.json` for a full list of available options.

--- 

## Features

- **Real‑time updates** via WebSocket
- **Heatmap** of per‑endpoint latency
- **Alerts** through Slack, SMTP email, or both
- **Log rotation** (toggleable)
- **Custom theming** with `theme.json`
- Zero‑configuration endpoint discovery (add to `endpoints.json`)

--- 

## Architecture

```text
config/endpoints.json
        │
        ▼
src/poller.js          → Sends HTTP requests, stores metrics
        │
        ▼
src/alerts.js          → Evaluates thresholds, triggers Slack/email
        │
        ▼
src/dashboard.js       → Streams metrics to the UI via WebSocket
```

--- 

## Development

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Testing

```bash
npm test
```

The Jest test suite covers polling logic, alert evaluation, and HTTP routes.

### Linting & formatting

```bash
npm run lint     # Lint with ESLint
npm run format   # Format with Prettier
```

Both should pass before opening a pull request.

--- 

## Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/your-feature`).  
3. Run `npm test` to ensure all tests pass.  
4. Commit with a clear, concise message.  
5. Push and open a pull request.  
6. Verify that linting passes.

All contributions are welcome—please maintain the code style and keep tests passing.

--- 

## Changelog

### v2.4.1 – 2026‑07‑14
- Added log rotation toggle.  
- Improved heatmap responsiveness.  
- Fixed theme variable parsing.

### v2.3.0 – 2026‑05‑02
- Introduced Slack alert support.  
- Added advanced dashboard theming.

--- 

## License

MIT © [shubhyagami](https://github.com/shubhyagami)
