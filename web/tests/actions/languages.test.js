import * as backend from '../../src/backend';
import * as languages from '../../src/actions/languages';

const mockLanguages = ['en', 'fr'];
let dispatch;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(backend, 'sendRequest');
  dispatch = jest.fn();
});

describe('getLanguages', () => {
  test('should fetch languages', async () => {
    backend.sendRequest.mockImplementation(() => mockLanguages);
    await languages.getLanguages()(dispatch);
    expect(backend.sendRequest.mock.calls[0][0]).toEqual('languages');
    expect(dispatch.mock.calls[0][0]).toEqual({
      languages:mockLanguages,
      type: 'ACTION_GOT_LANGUAGES',
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    backend.sendRequest.mockImplementation(() => { throw error; });
    expect(languages.getLanguages()(dispatch)).resolves.not.toThrow();
    expect(console.error.mock.calls[0][0]).toEqual('Failed to fetch languages');
  });
});
