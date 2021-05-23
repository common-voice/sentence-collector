export async function sendRequest<T>(endpoint: string, method?: string, data?: unknown): Promise<T>;
export async function sendRequest<T>(endpoint: string, method = 'GET', data: unknown): Promise<T> {
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
