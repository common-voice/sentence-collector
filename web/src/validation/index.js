import tokenizeWords from 'talisman/tokenizers/words';

import * as en from './languages/en';

const VALIDATORS = {
  en,
};

const DEFAULT_VALIDATOR_LANGUAGE = 'en';
const DEFAULT_VALIDATOR = VALIDATORS[DEFAULT_VALIDATOR_LANGUAGE];

export function validateSentences(language, sentences) {
  const validator = getValidatorFor(language);
  let valid = new Set();
  let filtered = new Set();

  run([
    getSentencesWithCorrectLength(validator, sentences),
    getSentencesWithoutNumbers(validator, sentences),
    getSentencesWithoutAbbreviations(validator, sentences),
    getSentencesWithoutSymbols(validator, sentences),
  ], valid, filtered);

  return {
    valid: [...valid],
    filtered: [...filtered],
  };
}

function run(actionResults, existingValid, existingFiltered) {
  actionResults.map(actionResult => {
    processInPlace(actionResult, existingValid, existingFiltered);
  });
}

function processInPlace(processable, existingValid, existingFiltered) {
  const { valid, filtered } = processable;
  processValid(existingValid, valid);
  removeFilteredFromValid(existingValid, filtered);
  processFiltered(existingFiltered, filtered);
}

function processValid(existingValid, valid) {
  valid.map(validSentence => existingValid.add(validSentence));
}

function removeFilteredFromValid(existingValid, filtered) {
  filtered.map(filteredSentence => existingValid.delete(filteredSentence));
}

function processFiltered(existingFiltered, filtered) {
  filtered.map(filteredSentence => existingFiltered.add(filteredSentence));
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

function getSentencesWithoutNumbers(validator, sentences) {
  const { valid, filtered } =
    typeof validator.filterNumbers !== 'function' ?
      DEFAULT_VALIDATOR.filterNumbers(sentences) :
      validator.filterNumbers(sentences);

  return { valid, filtered };
}

function getSentencesWithoutAbbreviations(validator, sentences) {
  const { valid, filtered } =
    typeof validator.filterAbbreviations !== 'function' ?
      DEFAULT_VALIDATOR.filterAbbreviations(sentences) :
      validator.filterAbbreviations(sentences);

  return { valid, filtered };
}

function getSentencesWithoutSymbols(validator, sentences) {
  const { valid, filtered } =
    typeof validator.filterSymbols !== 'function' ?
      DEFAULT_VALIDATOR.filterSymbols(sentences) :
      validator.filterSymbols(sentences);

  return { valid, filtered };
}

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}