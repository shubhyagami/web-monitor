# web-monitor

A lightweight, real‑time dashboard for monitoring web application performance. It watches endpoint uptime and response times, and can trigger custom alerts when thresholds are crossed.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributions](https://img.shields.io/badge/PRs-welcome-orange)
![Maintained by](https://img.shields.io/badge/Maintained%20by-shubhyagami-blue)

---  

## Features  

- **Live Dashboard** – Visualize current metrics for all monitored URLs.  
- **Latency Heatmaps** – Spot slow endpoints instantly with color‑coded grids and hover‑over details.  
- **Custom Alerts** – Send Slack messages or email notifications when response‑time limits are breached.  
- **Theming** – Personalize colors, fonts, and layout via a `theme.json` file in `config/`.  
- **Log Rotation** – Automatically prune old logs by enabling `LOG_ROTATION=true`.  
- **Dynamic Themes** – Reference environment variables in `theme.json` with `$VAR` syntax.  

---  

## Getting Started  

1. **Clone & Install**  
   ```bash
   git clone https://github.com/shubhyagami/web-monitor.git
   cd web-monitor
   npm install
   ```  

2. **Run the Development Server**  
   ```bash
   npm run dev
   ```  

3. **Open the Dashboard**  
   Navigate to `http://localhost:3000` in your browser to view live metrics.  

---  

## Configuration  

- **Environment Variables** – Add required secrets or URLs to a `.env` file.  
- **Theme Customization** – Create or edit `config/theme.json` to adjust colors, fonts, and layout.  
- **Alert Integration** – Provide Slack webhook URLs or email endpoints in the dashboard settings.  

---  

## Example Use‑Case  

Deploy `web-monitor` as an internal health‑check for a SaaS product. Configure it to poll critical endpoints every 30 seconds, set response‑time thresholds, and route alerts to a Slack channel for rapid incident response.  

---  

## Contributing  

1. **Open an Issue** – Describe bugs or feature requests to start the discussion.  
2. **Fork & Branch** – Create a feature branch from `main` (e.g., `git checkout -b feat/your-idea`).  
3. **Run Tests** – Verify everything works on supported Node versions (18, 20, 22):  
   ```bash
   npm test
   ```  
4. **Submit a Pull Request** – Include a clear description of your changes.  

---  

## Changelog (excerpt)  

- **2.4.1** – Added log rotation toggle, improved heatmap responsiveness, and fixed theme variable parsing.  
- **2.3.0** – Introduced Slack alert support and enhanced dashboard theming.  

---  

May your response times be low and your uptime high.
