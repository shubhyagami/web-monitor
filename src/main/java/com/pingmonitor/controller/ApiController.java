package com.pingmonitor.controller;

import com.pingmonitor.model.Website;
import com.pingmonitor.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

  @Autowired
  private MonitorService monitorService;

  @GetMapping("/websites")
  public List<Website> getWebsites() {
    return monitorService.getWebsites();
  }

  @PostMapping("/websites")
  public List<Website> addWebsite(@RequestBody Map<String, String> body) {
    monitorService.addWebsite(body.get("url"));
    return monitorService.getWebsites();
  }

  @DeleteMapping("/websites/{id}")
  public List<Website> removeWebsite(@PathVariable String id) {
    monitorService.removeWebsite(id);
    return monitorService.getWebsites();
  }

  @PostMapping("/websites/{id}/toggle")
  public List<Website> toggleWebsite(@PathVariable String id) {
    monitorService.toggleWebsite(id);
    return monitorService.getWebsites();
  }

  @GetMapping("/check")
  public ResponseEntity<?> checkUrl(@RequestParam String url) {
    if (url == null || url.isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("error", "Missing url parameter"));
    }
    return ResponseEntity.ok(monitorService.checkUrl(url));
  }

  @PostMapping("/check/{id}")
  public ResponseEntity<?> checkWebsite(@PathVariable String id) {
    Map<String, Object> result = monitorService.checkWebsite(id);
    if (result == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(result);
  }

  @PostMapping("/check-all")
  public List<Website> checkAll() {
    monitorService.checkAllActive();
    return monitorService.getWebsites();
  }
}
