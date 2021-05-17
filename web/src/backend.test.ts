import { sendRequest } from './backend';

describe('sendRequest', () => {
  beforeEach(() => {
    // @ts-ignore
    fetch.resetMocks();
    // @ts-ignore
    fetch.mockResponse(JSON.stringify({}));
  });

  test('should GET fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint);
    expect(fetch).toHaveBeenCalledWith('/sentence-collector/foo', { method: 'GET' });
  });

  test('should DELETE fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint, 'DELETE');
    expect(fetch).toHaveBeenCalledWith('/sentence-collector/foo', { method: 'DELETE' });
  });

  test('should POST fetch', async () => {
    const endpoint = 'foo';
    const data = { foo: 'bar' };
    sendRequest(endpoint, 'POST', data);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toBe('/sentence-collector/foo');
    // @ts-ignore
    expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(data));
  });
});
