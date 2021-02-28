import * as backend from '../backend';
import * as languages from './languages';

const mockLanguages = ['en', 'fr'];
const mockStats = { en: 2 };
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
      languages: mockLanguages,
      type: languages.ACTION_GOT_LANGUAGES,
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

describe('getStats', () => {
  test('should fetch stats', async () => {
    backend.sendRequest.mockImplementation(() => mockStats);
    await languages.getStats(['en', 'de'])(dispatch);
    expect(backend.sendRequest.mock.calls[0][0]).toEqual('stats?locales=en,de');
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: languages.ACTION_GET_STATS,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      stats: mockStats,
      type: languages.ACTION_GOT_STATS,
    });
  });

  test('should not fetch stats if recently fetched', async () => {
    backend.sendRequest.mockImplementation(() => mockStats);
    await languages.getStats(['en', 'de'], new Date())(dispatch);
    expect(backend.sendRequest).not.toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: languages.ACTION_RESET_STATS_STATUS,
    });
  });

  test('should not throw on error and reset status', async () => {
    const error = new Error('NOPE');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    backend.sendRequest.mockImplementation(() => { throw error; });
    expect(languages.getStats()(dispatch)).resolves.not.toThrow();
    expect(console.error.mock.calls[0][0]).toEqual('Failed to fetch stats');
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: languages.ACTION_RESET_STATS_STATUS,
    });
  });
});

describe('addLanguage', () => {
  test('should add language', async () => {
    const language = 'en';
    const allLanguages = [language];
    backend.sendRequest.mockImplementation(() => allLanguages);
    await languages.addLanguage(language)(dispatch);
    expect(backend.sendRequest.mock.calls[0][0]).toEqual('users/languages');
    expect(backend.sendRequest.mock.calls[0][1]).toEqual('PUT');
    expect(backend.sendRequest.mock.calls[0][2]).toEqual({ language });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: languages.ACTION_ADD_LANGUAGE_REQUEST,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      languages: allLanguages,
      type: languages.ACTION_ADD_LANGUAGE_SUCCESS,
    });
  });

  test('should throw on error', async () => {
    const language = 'en';
    const error = new Error('NOPE');
    backend.sendRequest.mockImplementation(() => { throw error; });
    expect(languages.addLanguage(language)(dispatch)).rejects.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: languages.ACTION_ADD_LANGUAGE_FAILURE,
    });
  });
});

describe('removeLanguage', () => {
  test('should remove language', async () => {
    const language = 'en';
    const allLanguages = [];
    backend.sendRequest.mockImplementation(() => allLanguages);
    await languages.removeLanguage(language)(dispatch);
    expect(backend.sendRequest.mock.calls[0][0]).toEqual(`users/languages/${language}`);
    expect(backend.sendRequest.mock.calls[0][1]).toEqual('DELETE');
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: languages.ACTION_REMOVE_LANGUAGE_REQUEST,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      languages: allLanguages,
      type: languages.ACTION_REMOVE_LANGUAGE_SUCCESS,
    });
  });

  test('should throw on error', async () => {
    const language = 'en';
    const error = new Error('NOPE');
    backend.sendRequest.mockImplementation(() => { throw error; });
    expect(languages.removeLanguage(language)(dispatch)).rejects.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: languages.ACTION_REMOVE_LANGUAGE_FAILURE,
    });
  });
});
