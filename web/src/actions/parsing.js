import { getDBInstance } from '../web-db';
import * as validation from '../../../server/lib/validation';

export const ACTION_PARSE_SENTENCES_FAILURE = 'PARSE_SENTENCES_FAILURE';

const SPLIT_ON = '\n';

export function parseSentences(language, text) {
  return async function(dispatch) {
    try {
      const sentences = text.split(SPLIT_ON).map(s => s.trim()).filter(Boolean);
      const { valid, filtered, existing, submitted } = await filterSentences(language, sentences);
      const filteredSentences = filtered.map((filteredResult) => filteredResult.sentence);

      checkForNewSentences([
        ...valid,
        ...filteredSentences,
      ]);

      return {
        sentences: submitted,
        valid,
        filtered,
        existing,
      };
    } catch (err) {
      dispatch(parseSentencesFailure(err));
      throw err;
    }
  };
}

async function filterSentences(language, sentences) {
  const dedupedSentences = Array.from(new Set(sentences));
  const existingSentences = await getAlreadyDefinedSentences(language, dedupedSentences);

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

async function getAlreadyDefinedSentences(language, sentences) {
  const db = getDBInstance();
  const existing = await db.getAlreadyExistingSubset(language, sentences);
  const existingSentences = existing.map(s => s.sentence);
  return existingSentences;
}

function checkForNewSentences(sentences) {
  if (!sentences.length) {
    throw new Error('The sentences you submitted already exist.');
  }
}

export function parseSentencesFailure(error) {
  return {
    type: ACTION_PARSE_SENTENCES_FAILURE,
    error,
  };
}