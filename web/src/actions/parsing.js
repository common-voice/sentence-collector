import WebDB from '../web-db';
import * as validation from '../validation';

export const ACTION_PARSE_SENTENCES_STARTED = 'PARSE_SENTENCES_STARTED';
export const ACTION_PARSE_SENTENCES_FINISHED = 'PARSE_SENTENCES_FINISHED';
export const ACTION_PARSE_SENTENCES_FAILURE = 'PARSE_SENTENCES_FAILURE';

const SPLIT_ON = '\n';

export function parseSentences(language, text) {
  return async function(dispatch, getState) {
    try {
      dispatch(parseSentencesStarted());

      const state = getState();
      const credentials = {
        username: state.username,
        password: state.password,
      };

      const sentences = text.split(SPLIT_ON).map(s => s.trim()).filter(Boolean);
      const { valid, filtered, existing, submitted } = await filterSentences(language, sentences, credentials);

      checkForNewSentences([
        ...valid,
        ...filtered,
      ]);

      dispatch(parseSentencesFinished());

      return {
        sentences: submitted,
        valid,
        filtered,
        existing,
      };
    } catch (err) {
      dispatch(parseSentencesFailure(err));
      dispatch(parseSentencesFinished());
      throw err;
    }
  };
}

async function filterSentences(language, sentences, credentials) {
  const dedupedSentences = Array.from(new Set(sentences));
  const existingSentences = await getAlreadyDefinedSentences(language, dedupedSentences, credentials);

  const { valid, filtered } = validation.validateSentences(language, dedupedSentences);

  const validNonExisting = valid.filter(sentence => {
    const alreadyExisting = existingSentences.includes(sentence);
    return !alreadyExisting;
  });

  return {
    existing: existingSentences,
    valid: validNonExisting,
    filtered,
    submitted: dedupedSentences,
  };
}

async function getAlreadyDefinedSentences(language, sentences, credentials) {
  const db = new WebDB(credentials.username, credentials.password);
  const existing = await db.getAlreadyExistingSubset(language, sentences);
  const existingSentences = existing.map(s => s.sentence);
  return existingSentences;
}

function checkForNewSentences(sentences) {
  if (!sentences.length) {
    throw new Error('The sentences you submitted already exist.');
  }
}

export function parseSentencesStarted() {
  return {
    type: ACTION_PARSE_SENTENCES_STARTED,
  };
}

export function parseSentencesFinished() {
  return {
    type: ACTION_PARSE_SENTENCES_FINISHED,
  };
}

export function parseSentencesFailure(error) {
  return {
    type: ACTION_PARSE_SENTENCES_FAILURE,
    error,
  };
}