# web-monitor

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Real-time](https://img.shields.io/badge/Real--time-✔️-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.4.0-blueviolet)
![Uptime](https://img.shields.io/badge/uptime-99.97%25-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)
![Maintained](https://img.shields.io/badge/maintained-yes-success)

```
            __          __                     __
     __ __ / /_  ___   / /_  ____  ____  ___ / /_
    / // // __/ / _ \ / __/ / __ \/ __ \/ _ / __/
    \_,_/ \__/  \___/ \__/ /_/ /_/ /_/ /_//_\__/

        Real‑time web monitoring dashboard
              built with JavaScript
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shubhyagami/web-monitor.git
cd web-monitor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser – you'll see live metrics immediately.

## Pro Tips

- **Custom alerts**: Hook into the event stream to send Slack or email notifications when a page response time exceeds your threshold.
- **Dashboard themes**: Drop a `theme.json` file in the `config/` folder to override colours and layout.
- **Log rotation**: Enable `LOG_ROTATION=true` in your environment to keep historical data lean.

## Weekly Highlight

This week's spotlight is on **latency heatmaps**. The dashboard now visualises response times across all monitored URLs using a colour‑coded grid – instantly spot the slowest endpoints.

## Featured Use Case

### Monitor Your SaaS Uptime Dashboard

Deploy `web-monitor` as an internal health‑check for your customer‑facing SaaS product. Configure it to poll your critical endpoints every 30 seconds, set response‑time thresholds, and connect the event stream to a Slack webhook – so your team gets alerted the moment a page starts to degrade. With the new latency heatmaps, you can also see at a glance which regions are experiencing slowdowns, helping you pinpoint infrastructure issues before they impact users.

## What’s New (Changelog)

### 2026-08-06 — Version 2.4.1 “Temporal Stabilisation Patch”

- **Latency heatmaps** are now interactive – hover over any cell to see exact response time, timestamp, and HTTP status code.
- **Environment variable expansion** – you can now use `$VAR` syntax in `theme.json` for dynamic secrets (e.g., API keys).
- **Fixed** an issue where the dashboard would occasionally miss updates during daylight saving time transitions. Time is now truly linear.
- **Added** a new motivational quote to the dashboard footer (see below – because even a monitor needs encouragement).

> *“Time is not a straight line. It’s a big ball of wibbly‑wobbly… timey‑wimey… stuff.”* — The Doctor  
> *“But our monitors? They keep it steady.”* — TVA Engineering

## Motivational Quote

> *“In the vast multiverse of web endpoints, your monitor is the one constant. Keep watching. Keep measuring. You are the Timekeeper of uptime.”*

## Contributing (TVA Temporal Guidelines)

**Welcome, Variant!** You have been recruited to help maintain the Sacred Timeline of `web-monitor`. Every contribution is a reset charge that keeps the dashboard running smoothly. Before you submit a pull request, please align your actions with the following TVA protocols:

### 📜 1. File a Temporal Variance Report (Issue)

Before starting any work, **create an issue** describing the anomaly (feature request, bug, or timeline branch). Our Minutemen will review and assign it a case number. This prevents branching into a Nexus Event.

### 🕰️ 2. Prune Your Local Branch

- Fork the repository (a branch of the Sacred Timeline).
- Create a feature branch from `main`:  
  `git checkout -b feat/your-idea`  
  (or `fix/`, `docs/`, `refactor/`, etc.)
- Keep commits atomic – one change per commit, like one timeline per universe.

### 🔧 3. Run the TemPad Tests

Before submitting, ensure all tests pass and the dashboard still works across all known timelines (Node 18, 20, and 22). Run:

```bash
npm test
```

### 🚀 4. Submit a Pull Request

Open a PR against the `main` branch with a clear description of your changes. Our Time‑Keepers will review it and, if approved, merge it into the Sacred Timeline.

---

*May your response times be low and your uptime high.*