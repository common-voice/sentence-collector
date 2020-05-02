let _cachedUrl;
export function getDatabaseUrl() {
  if (_cachedUrl) {
    return _cachedUrl;
  }

  const root = document.getElementById('root');
  _cachedUrl = root.dataset.dbUrl;
  return _cachedUrl;
}

let _cachedBackendUrl;
export function getBackendUrl() {
  if (_cachedBackendUrl) {
    return _cachedBackendUrl;
  }

  const root = document.getElementById('root');
  _cachedBackendUrl = root.dataset.backendUrl;
  return _cachedBackendUrl;
}

