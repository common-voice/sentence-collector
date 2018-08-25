let _cachedUrl;
export function getDatabaseUrl() {
  if (_cachedUrl) {
    return _cachedUrl;
  }

  const root = document.getElementById('root');
  _cachedUrl = root.dataset.dbUrl;
  return _cachedUrl;
}

