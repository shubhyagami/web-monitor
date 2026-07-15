# Ping Monitor

A lightweight uptime monitor that checks your websites every 5 minutes and shows live status on a dashboard.

- **Frontend**: React + Vite (static, served by Vercel)
- **Backend**: Serverless function (`api/check.js`) that proxies HTTP requests to target URLs
- **No database needed** — website list and status history are stored in your browser's localStorage
- **Self-waking** — the browser automatically checks all active websites every 5 minutes (even wakes them if they were sleeping)

## Features

- Add as many websites as you want
- Each site shows: status (up/down), HTTP status code, latency, last-checked time
- Pause/resume monitoring per website
- Inactivity detection — pauses checks after 10 min idle, resumes when you interact
- "Check All Now" or check individual sites on demand
- Status history stored locally

## Deploy to Vercel (one place)

This is the only hosting you need — both the frontend and the API run on Vercel.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Vite — no settings to change
   - Click **Deploy**

3. **Done.** Your app will be live at `https://your-project.vercel.app`.

To deploy from CLI:
```bash
npm i -g vercel
vercel --prod
```

## Project Structure

```
├── api/
│   └── check.js          # Serverless function — checks website status
├── src/
│   ├── App.jsx           # Root component
│   ├── App.css           # All styles
│   ├── main.jsx          # Entry point
│   ├── components/
│   │   ├── Dashboard.jsx        # Main layout
│   │   ├── WebsiteCard.jsx      # Individual website card
│   │   ├── AddWebsiteForm.jsx   # Add new website form
│   │   └── InactivityBanner.jsx # Inactivity warning
│   ├── hooks/
│   │   ├── useWebsiteMonitor.js # Website state + 5-min polling
│   │   └── useActivityTracker.js # Inactivity detection
│   └── utils/
│       ├── storage.js    # localStorage helpers
│       └── timeAgo.js    # Time formatting
├── index.html
├── vercel.json           # Vercel routes config
├── vite.config.js
└── package.json
```

## How it works

1. You add a website URL through the dashboard
2. The frontend stores it in your browser's localStorage
3. Every 5 minutes, the frontend calls `GET /api/check?url=https://example.com`
4. The serverless function makes a real HTTP request to that URL (this wakes it up)
5. Status (up/down), response code, and latency are returned and displayed
6. All monitoring runs from your browser — no server process needed
