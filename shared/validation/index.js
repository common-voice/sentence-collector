import tokenizeWords from 'talisman/tokenizers/words';

import * as en from './languages/en';

const VALIDATORS = {
  en,
};

const DEFAULT_VALIDATOR_LANGUAGE = 'en';
const DEFAULT_VALIDATOR = VALIDATORS[DEFAULT_VALIDATOR_LANGUAGE];

export function validateSentences(language, sentences) {
  const validator = getValidatorFor(language);

  return runValidation(validator, sentences);
}

function runValidation(validator, sentences) {
  let filtered = [];

  const valid = sentences.reduce((validSentences, sentence) => {
    const validationResult = validateSentence(validator, sentence);
    if (validationResult.error) {
      filtered.push(validationResult);
      return validSentences;
    }

    validSentences.push(sentence);
    return validSentences;
  }, []);

  return {
    valid,
    filtered,
  };
}

function validateSentence(validator, sentence) {
  const validationResult = {
    sentence
  };

  if (!validateCorrectLength(validator, sentence)) {
    validationResult.error = 'Sentence too long';
    return validationResult;
  }

  if (!validateWithoutNumbers(validator, sentence)) {
    validationResult.error = 'Contains numbers';
    return validationResult;
  }

  if (!validateWithoutAbbreviations(validator, sentence)) {
    validationResult.error = 'Contains abbreviations';
    return validationResult;
  }

  if (!validateWithoutSymbols(validator, sentence)) {
    validationResult.error = 'Contains symbols';
    return validationResult;
  }

  return validationResult;
}

function validateCorrectLength(validator, sentence) {
  let maxLength = 0;
  let minLength = 0;

  if (typeof validator.getMaxLength !== 'function') {
    maxLength = DEFAULT_VALIDATOR.getMaxLength();
    minLength = DEFAULT_VALIDATOR.getMinLength();
  } else {
    maxLength = validator.getMaxLength();
    minLength = validator.getMinLength();
  }

  const words = tokenizeWords(sentence);
  return words.length >= minLength &&
    words.length <= maxLength;
}

function validateWithoutNumbers(validator, sentence) {
  const result =
    typeof validator.filterNumbers !== 'function' ?
      DEFAULT_VALIDATOR.filterNumbers(sentence) :
      validator.filterNumbers(sentence);

  return result;
}

function validateWithoutAbbreviations(validator, sentence) {
  const result =
    typeof validator.filterAbbreviations !== 'function' ?
      DEFAULT_VALIDATOR.filterAbbreviations(sentence) :
      validator.filterAbbreviations(sentence);

  return result;
}

function validateWithoutSymbols(validator, sentence) {
  const result =
    typeof validator.filterSymbols !== 'function' ?
      DEFAULT_VALIDATOR.filterSymbols(sentence) :
      validator.filterSymbols(sentence);

  return result;
}

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}