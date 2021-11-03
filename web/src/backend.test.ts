import fetchMock from 'jest-fetch-mock';
import { sendRequest } from './backend';

describe('sendRequest', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify({}));
  });

  test('should GET fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint);
    expect(fetchMock).toHaveBeenCalledWith('/sentence-collector/foo', { method: 'GET' });
  });

  test('should DELETE fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint, 'DELETE');
    expect(fetchMock).toHaveBeenCalledWith('/sentence-collector/foo', { method: 'DELETE' });
  });

  test('should POST fetch', async () => {
    const endpoint = 'foo';
    const data = { foo: 'bar' };
    sendRequest(endpoint, 'POST', data);
    expect(fetchMock.mock.calls[0].length).toBe(2);
    expect(fetchMock.mock.calls[0][0]).toBe('/sentence-collector/foo');
    expect(fetchMock.mock.calls[0][1]!.body).toBe(JSON.stringify(data));
  });
});
