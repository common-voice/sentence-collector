import tokenizeWords from 'talisman/tokenizers/words';

import * as en from './languages/en';

const VALIDATORS = {
  en,
};

const DEFAULT_VALIDATOR_LANGUAGE = 'en';
const DEFAULT_VALIDATOR = VALIDATORS[DEFAULT_VALIDATOR_LANGUAGE];

export function validateSentences(language, sentences) {
  const validator = getValidatorFor(language);
  const { valid, filtered } = getSentencesWithCorrectLength(validator, sentences);
  return { valid, filtered };
}

function getSentencesWithCorrectLength(validator, sentences) {
  let maxLength = 0;

  if (typeof validator.getMaxLength !== 'function') {
    maxLength = DEFAULT_VALIDATOR.getMaxLength();
  } else {
    maxLength = validator.getMaxLength();
  }

  const filtered = [];
  const valid = sentences.filter(sentence => {
    const words = tokenizeWords(sentence);
    if (words.length > maxLength) {
      filtered.push(sentence);
      return false;
    }

    return true;
  });

  return { valid, filtered };
}

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}