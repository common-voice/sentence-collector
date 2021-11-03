import fetchMock from 'fetch-mock';
import { sendRequest } from './backend';

describe('sendRequest', () => {
  beforeEach(() => {
    fetchMock.restore();
    fetchMock.get('*', JSON.stringify({}));
    fetchMock.post('*', JSON.stringify({}));
    fetchMock.delete('*', JSON.stringify({}));
  });

  test('should GET fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint);
    expect(fetchMock.calls()[0].length).toBe(2);
    expect(fetchMock.calls()[0][0]).toBe('/sentence-collector/foo');
    expect(fetchMock.calls()[0][1]!.method).toBe('GET');
  });

  test('should DELETE fetch', async () => {
    const endpoint = 'foo';
    sendRequest(endpoint, 'DELETE');
    expect(fetchMock.calls()[0].length).toBe(2);
    expect(fetchMock.calls()[0][0]).toBe('/sentence-collector/foo');
    expect(fetchMock.calls()[0][1]!.method).toBe('DELETE');
  });

  test('should POST fetch', async () => {
    const endpoint = 'foo';
    const data = { foo: 'bar' };
    sendRequest(endpoint, 'POST', data);
    expect(fetchMock.calls()[0].length).toBe(2);
    expect(fetchMock.calls()[0][0]).toBe('/sentence-collector/foo');
    expect(fetchMock.calls()[0][1]!.body).toBe(JSON.stringify(data));
  });
});
