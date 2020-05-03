import { getBackendUrl } from './config';

export function sendRequest(endpoint, method = 'GET', data) {
  const backendUrl = getBackendUrl();
  const url = `${backendUrl}/${endpoint}`;
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
