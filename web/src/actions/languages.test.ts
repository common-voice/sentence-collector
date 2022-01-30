import * as backend from '../backend';
import * as languages from './languages';
import type { Language } from '../types';

const mockLanguages = ['en', 'fr'];
let dispatch: jest.Mock;
let getState: jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(backend, 'sendRequest');
  jest.spyOn(console, 'error');
  dispatch = jest.fn();
  getState = jest.fn();
});

describe('getLanguages', () => {
  test('should fetch languages', async () => {
    (backend.sendRequest as jest.Mock).mockImplementation(() => mockLanguages);
    await languages.getLanguages()(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('languages');
    expect(dispatch.mock.calls[0][0]).toEqual({
      languages: mockLanguages,
      type: languages.ACTION_GOT_LANGUAGES,
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    (console.error as jest.Mock).mockImplementation(() => {
      /* ignore */
    });
    (backend.sendRequest as jest.Mock).mockImplementation(() => {
      throw error;
    });
    expect(languages.getLanguages()(dispatch, getState, null)).resolves.not.toThrow();
    expect((console.error as jest.Mock).mock.calls[0][0]).toEqual('Failed to fetch languages');
  });
});

describe('addLanguage', () => {
  test('should add language', async () => {
    const language = 'en';
    const allLanguages = [language];
    (backend.sendRequest as jest.Mock).mockImplementation(() => allLanguages);
    await languages.addLanguage(language)(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('users/languages');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][1]).toEqual('PUT');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][2]).toEqual({ language });
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
    (backend.sendRequest as jest.Mock).mockImplementation(() => {
      throw error;
    });
    expect(languages.addLanguage(language)(dispatch, getState, null)).rejects.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: languages.ACTION_ADD_LANGUAGE_FAILURE,
    });
  });
});

describe('removeLanguage', () => {
  test('should remove language', async () => {
    const language = 'en';
    const allLanguages: Language[] = [];
    (backend.sendRequest as jest.Mock).mockImplementation(() => allLanguages);
    await languages.removeLanguage(language)(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual(
      `users/languages/${language}`
    );
    expect((backend.sendRequest as jest.Mock).mock.calls[0][1]).toEqual('DELETE');
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
    (backend.sendRequest as jest.Mock).mockImplementation(() => {
      throw error;
    });
    expect(languages.removeLanguage(language)(dispatch, getState, null)).rejects.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: languages.ACTION_REMOVE_LANGUAGE_FAILURE,
    });
  });
});
