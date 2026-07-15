(function() {
  let inactivityTimer = null;
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000;
  let paused = false;

  const WEBSITE_CARD = function(id, url, active, lastStatus, lastStatusCode, lastLatency, lastChecked) {
    const hostname = (() => {
      try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
    })();
    const statusClass = lastStatus ? (lastStatus === 'up' ? 'up' : 'down') : 'unknown';
    const checked = lastChecked ? lastChecked.substring(0, 19).replace('T', ' ') : 'never';
    return `<div id="card-${id}" class="website-card ${statusClass}" data-id="${id}">
      <div class="card-header">
        <div class="status-dot"></div>
        <div class="card-url">
          <span class="hostname">${hostname}</span>
          <span class="full-url">${url}</span>
        </div>
      </div>
      <div class="card-stats">
        ${lastStatusCode > 0 ? `<div class="stat"><span class="stat-label">Status</span><span class="stat-value">${lastStatusCode}</span></div>` : ''}
        ${lastLatency > 0 ? `<div class="stat"><span class="stat-label">Latency</span><span class="stat-value">${lastLatency}ms</span></div>` : ''}
        <div class="stat"><span class="stat-label">Checked</span><span class="stat-value">${checked}</span></div>
        <div class="stat"><span class="stat-label">Wake-up</span><span class="stat-value ${active ? 'active' : 'paused'}">${active ? 'Active' : 'Paused'}</span></div>
      </div>
      <div class="card-actions">
        <button class="btn-toggle" onclick="window.toggleWebsite('${id}')">${active ? 'Pause' : 'Resume'}</button>
        <button class="btn-check" onclick="window.checkWebsite('${id}')">Check Now</button>
        <button class="btn-remove" onclick="window.removeWebsite('${id}')">Remove</button>
      </div>
    </div>`;
  };

  function updateSubtitle(websites) {
    const el = document.getElementById('subtitle');
    if (!el) return;
    const up = websites.filter(function(w) { return w.lastStatus === 'up'; }).length;
    el.textContent = websites.length === 0
      ? 'Add a website to start monitoring'
      : up + '/' + websites.length + ' websites up \u2014 auto-checks every 5 min';
  }

  function refreshUI() {
    if (paused) return;
    fetch('/api/websites')
      .then(function(r) { return r.json(); })
      .then(function(websites) {
        const grid = document.getElementById('website-grid');
        const empty = document.getElementById('empty-state');
        const actions = document.getElementById('actions-bar');
        if (!grid) return;
        grid.innerHTML = websites.map(function(w) { return WEBSITE_CARD(w.id, w.url, w.active, w.lastStatus, w.lastStatusCode, w.lastLatency, w.lastChecked); }).join('');
        updateSubtitle(websites);
        if (empty) empty.style.display = websites.length === 0 ? 'block' : 'none';
        if (actions) actions.style.display = websites.length === 0 ? 'none' : 'block';
      })
      .catch(function() {});
  }

  window.addWebsite = function() {
    var input = document.getElementById('url-input');
    var error = document.getElementById('form-error');
    var url = (input.value || '').trim();
    if (!url) { error.textContent = 'Please enter a URL'; input.classList.add('error'); return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); } catch(e) { error.textContent = 'Invalid URL'; input.classList.add('error'); return; }
    error.textContent = '';
    input.classList.remove('error');
    input.value = '';
    fetch('/api/websites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url }) })
      .then(function(r) { return r.json(); })
      .then(function() { refreshUI(); resetInactivity(); })
      .catch(function() {});
  };

  window.removeWebsite = function(id) {
    fetch('/api/websites/' + id, { method: 'DELETE' })
      .then(function(r) { return r.json(); })
      .then(function() { refreshUI(); resetInactivity(); })
      .catch(function() {});
  };

  window.toggleWebsite = function(id) {
    fetch('/api/websites/' + id + '/toggle', { method: 'POST' })
      .then(function(r) { return r.json(); })
      .then(function() { refreshUI(); resetInactivity(); })
      .catch(function() {});
  };

  window.checkWebsite = function(id) {
    var btn = document.querySelector('#card-' + id + ' .btn-check');
    if (btn) { btn.disabled = true; btn.textContent = 'Checking...'; }
    fetch('/api/check/' + id, { method: 'POST' })
      .then(function(r) { return r.json(); })
      .then(function() { refreshUI(); resetInactivity(); })
      .catch(function() {});
  };

  function checkAll() {
    var btn = document.getElementById('btn-check-all');
    if (btn) { btn.disabled = true; btn.textContent = 'Checking...'; }
    fetch('/api/check-all', { method: 'POST' })
      .then(function(r) { return r.json(); })
      .then(function(websites) {
        refreshUI();
        if (btn) { btn.disabled = false; btn.textContent = 'Check All Now'; }
      })
      .catch(function() { if (btn) { btn.disabled = false; btn.textContent = 'Check All Now'; } });
  }

  function resetInactivity() {
    paused = false;
    document.getElementById('inactivity-banner').classList.remove('visible');
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(function() {
      paused = true;
      document.getElementById('inactivity-banner').classList.add('visible');
    }, INACTIVITY_TIMEOUT);
  }

  document.addEventListener('DOMContentLoaded', function() {
    resetInactivity();
    var events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach(function(e) { document.addEventListener(e, resetInactivity); });

    document.getElementById('add-form').addEventListener('submit', function(e) {
      e.preventDefault();
      window.addWebsite();
    });

    document.getElementById('btn-check-all').addEventListener('click', checkAll);
    document.getElementById('url-input').addEventListener('input', function() {
      this.classList.remove('error');
      document.getElementById('form-error').textContent = '';
    });

    setInterval(refreshUI, 30000);
    setInterval(function() {
      if (!paused) checkAll();
    }, 300000);
  });
})();
