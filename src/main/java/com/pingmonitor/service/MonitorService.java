package com.pingmonitor.service;

import com.pingmonitor.model.Website;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class MonitorService {

  private final Map<String, Website> websites = new ConcurrentHashMap<>();
  private final HttpClient client = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .followRedirects(HttpClient.Redirect.NORMAL)
      .build();

  @PostConstruct
  public void init() {
    List<String> defaults = List.of(
        "https://musix-fh82.onrender.com",
        "https://chat-in-terminal.onrender.com",
        "https://comfortzone-b64p.onrender.com",
        "https://cloudbucket.onrender.com",
        "https://ecommerce-z4t5.onrender.com",
        "https://coffeeconnect-y0vv.onrender.com",
        "https://streaming-sikk.onrender.com"
    );
    for (String url : defaults) {
      addWebsite(url);
    }
  }

  public List<Website> getWebsites() {
    return websites.values().stream()
        .sorted(Comparator.comparing(Website::getAddedAt).reversed())
        .collect(Collectors.toList());
  }

  public Website addWebsite(String url) {
    String id = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    Website w = new Website(id, url, true, Instant.now().toString());
    websites.put(id, w);
    return w;
  }

  public void removeWebsite(String id) {
    websites.remove(id);
  }

  public Website toggleWebsite(String id) {
    Website w = websites.get(id);
    if (w != null) {
      w.setActive(!w.isActive());
    }
    return w;
  }

  public Map<String, Object> checkUrl(String url) {
    long start = System.currentTimeMillis();
    try {
      HttpRequest req = HttpRequest.newBuilder()
          .uri(URI.create(url))
          .method("HEAD", HttpRequest.BodyPublishers.noBody())
          .timeout(Duration.ofSeconds(10))
          .build();
      HttpResponse<Void> res = client.send(req, HttpResponse.BodyHandlers.discarding());
      long latency = System.currentTimeMillis() - start;
      Map<String, Object> result = new LinkedHashMap<>();
      result.put("url", url);
      result.put("status", res.statusCode() < 400 ? "up" : "down");
      result.put("statusCode", res.statusCode());
      result.put("latency", latency);
      result.put("timestamp", Instant.now().toString());
      return result;
    } catch (Exception e) {
      long latency = System.currentTimeMillis() - start;
      Map<String, Object> result = new LinkedHashMap<>();
      result.put("url", url);
      result.put("status", "down");
      result.put("statusCode", 0);
      result.put("latency", latency);
      result.put("timestamp", Instant.now().toString());
      result.put("error", e.getMessage());
      return result;
    }
  }

  public void updateWebsiteStatus(String id, Map<String, Object> result) {
    Website w = websites.get(id);
    if (w != null) {
      w.setLastStatus((String) result.get("status"));
      w.setLastStatusCode((Integer) result.get("statusCode"));
      w.setLastLatency((Long) result.get("latency"));
      w.setLastChecked((String) result.get("timestamp"));
    }
  }

  public Map<String, Object> checkWebsite(String id) {
    Website w = websites.get(id);
    if (w == null) return null;
    Map<String, Object> result = checkUrl(w.getUrl());
    updateWebsiteStatus(id, result);
    return result;
  }

  @Scheduled(fixedRate = 300000)
  public void checkAllActive() {
    for (Website w : websites.values()) {
      if (w.isActive()) {
        Map<String, Object> result = checkUrl(w.getUrl());
        updateWebsiteStatus(w.getId(), result);
      }
    }
  }
}
