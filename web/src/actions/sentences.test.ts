import * as backend from '../backend';
import * as languages from './languages';
import * as sentences from './sentences';

let dispatch: jest.Mock;
let getState: jest.Mock;
const exampleSentences = [
  'This is a test.',
  'This too!',
];

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(backend, 'sendRequest');
  jest.spyOn(console, 'error');
  dispatch = jest.fn();
  getState = jest.fn().mockReturnValue({ languages: { languages: ['en'] } });
});

describe('loadRejectedSentences', () => {
  test('should load rejected sentences', async () => {
    (backend.sendRequest as jest.Mock).mockImplementation(() => exampleSentences);
    await sentences.loadRejectedSentences()(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('sentences/rejected');
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_LOAD_REJECTED_SENTENCES,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: sentences.ACTION_GOT_REJECTED_SENTENCES,
      sentences: exampleSentences,
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    (backend.sendRequest as jest.Mock).mockImplementation(() => { throw error; });
    expect(sentences.loadRejectedSentences()(dispatch, getState, null)).resolves.not.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: sentences.ACTION_REJECTED_SENTENCES_FAILURE,
      errorMessage: 'NOPE',
    });
  });
});

describe('resetReviewMessage', () => {
  test('should reset message', async () => {
    await sentences.resetReviewMessage()(dispatch, getState, null);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_REVIEW_RESET_MESSAGE,
    });
  });
});

describe('loadSentences', () => {
  test('should load sentences', async () => {
    const language = 'en';
    (backend.sendRequest as jest.Mock).mockImplementation(() => exampleSentences);
    await sentences.loadSentences(language)(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual(`sentences/review?locale=${language}`);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_LOAD_SENTENCES,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: sentences.ACTION_GOT_SENTENCES,
      sentences: exampleSentences,
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    (backend.sendRequest as jest.Mock).mockImplementation(() => { throw error; });
    (console.error as jest.Mock).mockImplementation(() => { /* ignore */ });
    expect(sentences.loadSentences('en')(dispatch, getState, null)).resolves.not.toThrow(error);
    expect((console.error as jest.Mock).mock.calls[0][0]).toEqual(error);
  });
});

describe('reviewSentences', () => {
  const data = { invalidated: [1], validated: [2, 3] };
  
  test('should upload votes and fetch latest sentences', async () => {
    (backend.sendRequest as jest.Mock).mockImplementation(() => exampleSentences);
    await sentences.reviewSentences(data, 'en')(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('votes');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][1]).toEqual('PUT');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][2]).toEqual(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_REVIEWED_SENTENCES,
    });
    const loadSentencesAction = dispatch.mock.calls[1][0];
    loadSentencesAction(dispatch);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: sentences.ACTION_LOAD_SENTENCES,
    });
  });

  test('should not throw on error', async () => {
    const error = new Error('NOPE');
    (backend.sendRequest as jest.Mock).mockImplementation(() => { throw error; });
    expect(sentences.reviewSentences(data, 'en')(dispatch, getState, null)).resolves.not.toThrow(error);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_REVIEW_SENTENCES_FAILURE,
      errorMessage: 'NOPE',
    });
  });
});

describe('uploadSentences', () => {
  test('should upload sentences', async () => {
    const data = {
      source: 'Test Source',
      locale: 'en',
      sentences: exampleSentences,
    };
    (backend.sendRequest as jest.Mock).mockImplementation(() => { /* ignore */ });
    const returnedSentences = await sentences.uploadSentences(data)(dispatch, getState, null);
    expect((backend.sendRequest as jest.Mock).mock.calls[0][0]).toEqual('sentences');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][1]).toEqual('PUT');
    expect((backend.sendRequest as jest.Mock).mock.calls[0][2]).toEqual(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: sentences.ACTION_SUBMIT_SENTENCES_REQUEST,
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: sentences.ACTION_SUBMIT_SENTENCES_DONE,
    });
    expect(returnedSentences).toEqual({});
  });

  test('should set failed sentences', async () => {
    const data = {
      source: 'Test Source',
      locale: 'en',
      sentences: exampleSentences,
    };
    const errors = [{
      sentence: 'I failed',
    }];
    (backend.sendRequest as jest.Mock).mockImplementation(() => ({ errors }));
    const returnedSentences = await sentences.uploadSentences(data)(dispatch, getState, null);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: sentences.ACTION_SUBMIT_SENTENCES_ERRORS,
      errors,
    });
    expect(returnedSentences).toEqual({ errors });
  });

  test('should add language if not yet in user profile', async () => {
    const data = {
      source: 'Test Source',
      locale: 'en',
      sentences: exampleSentences,
    };
    getState.mockReturnValue({ languages: { languages: [] } });
    (backend.sendRequest as jest.Mock).mockImplementation(() => ({ errors: [] }));
    await sentences.uploadSentences(data)(dispatch, getState, null);
    const addLanguageAction = dispatch.mock.calls[3][0];
    addLanguageAction(dispatch);
    expect(dispatch.mock.calls[4][0]).toEqual({
      type: languages.ACTION_ADD_LANGUAGE_REQUEST,
    });
  });

  test('should throw on error', async () => {
    const error = new Error('NOPE');
    const data = {
      source: 'Test Source',
      locale: 'en',
      sentences: exampleSentences,
    };
    (backend.sendRequest as jest.Mock).mockImplementation(() => { throw error; });
    expect(sentences.uploadSentences(data)(dispatch, getState, null)).rejects.toThrow(error);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: sentences.ACTION_SUBMIT_SENTENCES_DONE,
    });
  });
});
