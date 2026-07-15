package com.pingmonitor.controller;

import com.pingmonitor.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  @Autowired
  private MonitorService monitorService;

  @GetMapping("/")
  public String index(Model model) {
    var websites = monitorService.getWebsites();
    model.addAttribute("websites", websites);
    model.addAttribute("upCount", websites.stream().filter(w -> "up".equals(w.getLastStatus())).count());
    return "index";
  }
}
