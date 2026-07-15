package com.pingmonitor.service;

import com.pingmonitor.model.Website;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
public class MonitorService {

  @Autowired
  private WebsiteRepository repo;

  private final HttpClient client = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .followRedirects(HttpClient.Redirect.NORMAL)
      .build();

  @PostConstruct
  public void init() {
    if (repo.count() > 0) return;
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
    return repo.findAll().stream()
        .sorted(Comparator.comparing(Website::getAddedAt).reversed())
        .toList();
  }

  @Transactional
  public Website addWebsite(String url) {
    String id = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    Website w = new Website(id, url, true, Instant.now().toString());
    return repo.save(w);
  }

  @Transactional
  public void removeWebsite(String id) {
    repo.deleteById(id);
  }

  @Transactional
  public Website toggleWebsite(String id) {
    Optional<Website> opt = repo.findById(id);
    if (opt.isPresent()) {
      Website w = opt.get();
      w.setActive(!w.isActive());
      return repo.save(w);
    }
    return null;
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

  @Transactional
  public void updateWebsiteStatus(String id, Map<String, Object> result) {
    Optional<Website> opt = repo.findById(id);
    if (opt.isPresent()) {
      Website w = opt.get();
      w.setLastStatus((String) result.get("status"));
      w.setLastStatusCode((Integer) result.get("statusCode"));
      Object lat = result.get("latency");
      w.setLastLatency(lat instanceof Number ? ((Number) lat).longValue() : 0);
      w.setLastChecked((String) result.get("timestamp"));
      repo.save(w);
    }
  }

  public Map<String, Object> checkWebsite(String id) {
    Optional<Website> opt = repo.findById(id);
    if (opt.isEmpty()) return null;
    Website w = opt.get();
    Map<String, Object> result = checkUrl(w.getUrl());
    updateWebsiteStatus(id, result);
    return result;
  }

  @Scheduled(fixedRate = 300000)
  @Transactional
  public void checkAllActive() {
    for (Website w : repo.findAll()) {
      if (w.isActive()) {
        Map<String, Object> result = checkUrl(w.getUrl());
        w.setLastStatus((String) result.get("status"));
        w.setLastStatusCode((Integer) result.get("statusCode"));
        Object lat = result.get("latency");
        w.setLastLatency(lat instanceof Number ? ((Number) lat).longValue() : 0);
        w.setLastChecked((String) result.get("timestamp"));
        repo.save(w);
      }
    }
  }
}
