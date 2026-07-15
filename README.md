# Ping Monitor

A lightweight uptime monitor that checks your websites every 5 minutes and shows live status on a dashboard.

**Stack**: Spring Boot + Thymeleaf (single deployable JAR)

- **Frontend**: Thymeleaf templates with retro-futuristic CSS
- **Backend**: Spring Boot with embedded server, scheduled checks via `@Scheduled`
- **Storage**: In-memory (works across page refreshes, restarts on redeploy)
- **Self-waking**: Server checks all active websites every 5 minutes automatically

## Features

- Add as many websites as you want
- Each site shows: status (up/down), HTTP status code, latency, last-checked time
- Pause/resume monitoring per website
- Inactivity detection — pauses UI refreshes after 10 min idle
- "Check All Now" or check individual sites on demand
- Pre-seeded with 7 default Render URLs
- Retro-futuristic synthwave UI

## Deploy to Render (one place)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "spring boot ping monitor"
   git push origin main
   ```

2. **Create a Web Service on [Render](https://dashboard.render.com)**
   - Connect your GitHub repository
   - Render detects Maven — builds with `./mvnw package`
   - Start command (from Procfile): `java -jar target/ping-monitor-*.jar`
   - Free tier works fine

3. **Done.** Your app will be live at `https://your-app.onrender.com`.

## Run locally

```bash
# requires Java 21+ and Maven
mvn package
java -jar target/ping-monitor-1.0.0.jar
# opens at http://localhost:8080
```

## Project Structure

```
├── pom.xml
├── Procfile
├── src/main/java/com/pingmonitor/
│   ├── PingMonitorApplication.java
│   ├── controller/
│   │   ├── HomeController.java      # Thymeleaf page
│   │   └── ApiController.java       # REST endpoints
│   ├── model/
│   │   └── Website.java
│   ├── service/
│   │   └── MonitorService.java      # CRUD + scheduled checks
│   └── config/
│       └── WebConfig.java
└── src/main/resources/
    ├── application.properties
    ├── templates/
    │   └── index.html               # Thymeleaf dashboard
    └── static/
        ├── css/style.css
        └── js/app.js
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Dashboard page |
| GET | `/api/websites` | List all websites |
| POST | `/api/websites` | Add website `{"url":"..."}` |
| DELETE | `/api/websites/{id}` | Remove website |
| POST | `/api/websites/{id}/toggle` | Pause/resume website |
| GET | `/api/check?url=...` | Check a URL immediately |
| POST | `/api/check/{id}` | Check a specific website |
| POST | `/api/check-all` | Check all active websites |
