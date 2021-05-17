export async function sendRequest(endpoint: string, method?: string, data?: unknown);

export async function sendRequest(endpoint, method = 'GET', data) {
  const url = `/sentence-collector/${endpoint}`; // we always have the backend at that path, even locally
  const options: RequestInit = {
    method,
  };

  if (data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    options.headers = headers;
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Request failed.');
  }

  return json;
}
