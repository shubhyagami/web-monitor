# web-monitor

![Version](https://img.shields.io/badge/version-2.4.1-blueviolet)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)
![Maintained by](https://img.shields.io/badge/Maintained_by-shubhyagami-blue)

A real-time web monitoring dashboard built with Node.js. Monitor your application's performance, track endpoint uptime, visualize response times, and set custom alerts for performance degradations.

## Features

*   **Real-time Dashboard:** View live metrics for all monitored URLs.
*   **Interactive Latency Heatmaps:** Identify slow endpoints instantly with color-coded grids and hover-over details on exact response time, timestamp, and HTTP status code.
*   **Custom Alerts:** Integrate Slack or email notifications for defined response-time thresholds.
*   **Theming Support:** Customize dashboard colors and layout by creating a `theme.json` file in the `config/` directory.
*   **Log Rotation:** Enable `LOG_ROTATION=true` in your environment to manage historical data.

## Getting Started

To start monitoring your application, follow these steps:

1.  Clone the repository and navigate into the directory:
    ```bash
    git clone https://github.com/shubhyagami/web-monitor.git
    cd web-monitor
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:3000` in your browser to view the live metrics dashboard.

## Example Usage

Deploy `web-monitor` as an internal health-check for your customer-facing SaaS product. Configure it to poll critical endpoints every 30 seconds, set response-time thresholds, and connect the event stream to a Slack webhook.

## Tips

*   **Dynamic Secrets:** Use `$VAR` syntax in `theme.json` to safely reference environment variables for API keys or tokens.
*   **Historical Data:** Enable `LOG_ROTATION=true` to automatically prune old logs and keep data storage lean.

## Changelog

*   **v2.4.1 (2026-08-06):**
    *   **Interactive Latency Heatmaps:** Hover over any cell to see exact response time, timestamp, and HTTP status code.
    *   **Environment Variable Expansion:** Added support for `$VAR` syntax in `theme.json`.
    *   **Bugfix:** Fixed an issue where the dashboard would occasionally miss updates during daylight saving time transitions.

## Contributing

Contributions are welcome! Before opening a pull request, please follow these steps:

1.  **Open an Issue:** Describe the bug or feature request to get feedback and a case number.
2.  **Fork and Branch:** Fork the repo and create a feature branch from `main` (e.g., `git checkout -b feat/your-idea`).
3.  **Run Tests:** Ensure all tests pass across supported Node versions (18, 20, 22) by running:
    ```bash
    npm test
    ```
4.  **Submit a PR:** Open a pull request against the `main` branch with a clear description of your changes.

---

*May your response times be low and your uptime high.*
