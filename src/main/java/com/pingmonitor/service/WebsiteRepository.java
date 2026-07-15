package com.pingmonitor.service;

import com.pingmonitor.model.Website;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, String> {
  long count();
}
