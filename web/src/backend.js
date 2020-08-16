export function sendRequest(endpoint, method = 'GET', data) {
  const url = `/sentence-collector/${endpoint}`; // we always have the backend at that path, even locally
  const options = {
    method,
  };

  if (data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    options.headers = headers;
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then(response => response.json());
}
