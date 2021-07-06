import * as sentences from '../actions/sentences';
import sentencesReducer from './sentences';

const combineState = (fields: Record<string, unknown>) => {
  const initialState = sentencesReducer(undefined, {
    type: 'inexistant',
  });
  
  return {
    ...initialState,
    ...fields,
  };
};

test('should use initial state', async () => {
  const newState = sentencesReducer(combineState({}), {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    sentenceSubmissionFailures: {},
    isUploadingSentences: false,
    sentences: [],
    sentencesLoading: false,
    reviewMessage: '',
    skippedSentences: [],
  });
});

test('should reduce submit request', async () => {
  const newState = sentencesReducer(combineState({ sentenceSubmissionFailures: ['oh no'] }), {
    type: sentences.ACTION_SUBMIT_SENTENCES_REQUEST,
  });

  expect(newState.sentenceSubmissionFailures).toEqual({});
  expect(newState.isUploadingSentences).toEqual(true);
});

test('should reduce submission failure', async () => {
  const submissionFailures = [{
    error: 'Too long',
    sentence: 'Super super long sentence',
  }, {
    error: 'Too long',
    sentence: 'Another super long sentence',
  }, {
    error: 'Has symbols',
    sentence: '$$$$$',
  }];
  const newState = sentencesReducer(combineState({}), {
    type: sentences.ACTION_SUBMIT_SENTENCES_ERRORS,
    errors: submissionFailures,
  });

  expect(newState.sentenceSubmissionFailures).toEqual({
    'Too long': [
      'Super super long sentence',
      'Another super long sentence',
    ],
    'Has symbols': ['$$$$$'],
  });
});

test('should reduce submit done', async () => {
  const newState = sentencesReducer(combineState({ isUploadingSentences: true }), {
    type: sentences.ACTION_SUBMIT_SENTENCES_DONE,
  });

  expect(newState.isUploadingSentences).toEqual(false);
});

test('should reduce loading sentences', async () => {
  const newState = sentencesReducer(combineState({}), {
    type: sentences.ACTION_LOAD_SENTENCES,
  });

  expect(newState.sentencesLoading).toEqual(true);
});

test('should reduce sentences', async () => {
  const testSentences = ['Hi', 'All good?'];
  const newState = sentencesReducer(combineState({ sentencesLoading: true }), {
    type: sentences.ACTION_GOT_SENTENCES,
    sentences: testSentences,
  });

  expect(newState.sentencesLoading).toEqual(false);
  expect(newState.sentences).toEqual(testSentences);
});

test('should reduce reviewed sentences', async () => {
  const newState = sentencesReducer(combineState({}), {
    type: sentences.ACTION_REVIEWED_SENTENCES,
    votes: 10,
  });

  expect(newState.reviewMessage).toEqual('10 sentences reviewed. Thank you!');
});

test('should reduce reviewed sentences failure', async () => {
  const errorMessage = 'oh no';
  const newState = sentencesReducer(combineState({}), {
    type: sentences.ACTION_REVIEW_SENTENCES_FAILURE,
    errorMessage,
  });

  expect(newState.reviewMessage).toEqual(errorMessage);
});

test('should reduce initial skipped sentences', async () => {
  const newState = sentencesReducer(combineState({}), {
    type: sentences.ACTION_REVIEW_SAVE_SKIPPED_SENTENCES,
    sentenceIds: [10],
  });

  expect(newState.skippedSentences).toEqual([10]);
});

test('should reduce subsequent skipped sentences', async () => {
  const newState = sentencesReducer(combineState({ skippedSentences: [1] }), {
    type: sentences.ACTION_REVIEW_SAVE_SKIPPED_SENTENCES,
    sentenceIds: [10, 11],
  });

  expect(newState.skippedSentences).toEqual([1, 10, 11]);
});

test('should reduce skipped sentence reset', async () => {
  const newState = sentencesReducer(combineState({ skippedSentences: [1] }), {
    type: sentences.ACTION_REVIEW_RESET_SKIPPED_SENTENCES,
  });

  expect(newState.skippedSentences).toEqual([]);
});

test('should reduce review message reset', async () => {
  const newState = sentencesReducer(combineState({ reviewMessage: 'hi' }), {
    type: sentences.ACTION_REVIEW_RESET_MESSAGE,
  });

  expect(newState.reviewMessage).toEqual('');
});
