package com.pingmonitor.model;

public class Website {
  private String id;
  private String url;
  private boolean active;
  private String lastStatus;
  private int lastStatusCode;
  private long lastLatency;
  private String lastChecked;
  private String addedAt;

  public Website() {}

  public Website(String id, String url, boolean active, String addedAt) {
    this.id = id;
    this.url = url;
    this.active = active;
    this.addedAt = addedAt;
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getUrl() { return url; }
  public void setUrl(String url) { this.url = url; }

  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }

  public String getLastStatus() { return lastStatus; }
  public void setLastStatus(String lastStatus) { this.lastStatus = lastStatus; }

  public int getLastStatusCode() { return lastStatusCode; }
  public void setLastStatusCode(int lastStatusCode) { this.lastStatusCode = lastStatusCode; }

  public long getLastLatency() { return lastLatency; }
  public void setLastLatency(long lastLatency) { this.lastLatency = lastLatency; }

  public String getLastChecked() { return lastChecked; }
  public void setLastChecked(String lastChecked) { this.lastChecked = lastChecked; }

  public String getAddedAt() { return addedAt; }
  public void setAddedAt(String addedAt) { this.addedAt = addedAt; }
}
