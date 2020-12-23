const bas = require('./languages/bas');
const en = require('./languages/en');
const it = require('./languages/it');
const ne = require('./languages/ne');
const kab = require( './languages/kab');
const ru = require('./languages/ru');
const th = require('./languages/th');
const ur = require('./languages/ur');
const or = require('./languages/or');

const VALIDATORS = {
  bas,
  en,
  it,
  kab,
  ne,
  ru,
  th,
  ur,
  or,
};

const DEFAULT_VALIDATOR_LANGUAGE = 'en';
const DEFAULT_VALIDATOR = VALIDATORS[DEFAULT_VALIDATOR_LANGUAGE];

module.exports = {
  validateSentences,
};

function validateSentences(language, sentences) {
  const validator = getValidatorFor(language);

  return runValidation(validator, sentences);
}

function runValidation(validator, sentences = { unreviewed: [], validated: [] }) {
  let filtered = [];

  const validate = (validSentences, sentence) => {
    const validationResult = validateSentence(validator, sentence);
    if (validationResult.error) {
      filtered.push(validationResult);
      return validSentences;
    }

    validSentences.push(sentence);
    return validSentences;
  };

  const valid = sentences.unreviewed.reduce(validate, []);
  const validValidated = sentences.validated.reduce(validate, []);

  return {
    valid,
    validValidated,
    filtered,
  };
}

function validateSentence(validator, sentence) {
  const validationResult = {
    sentence
  };

  if (!validateCorrectLength(validator, sentence)) {
    validationResult.error = 'Sentence too long';
  } else if (!validateWithoutNumbers(validator, sentence)) {
    validationResult.error = 'Contains numbers';
  } else if (!validateWithoutAbbreviations(validator, sentence)) {
    validationResult.error = 'Contains abbreviations';
  } else if (!validateWithoutSymbols(validator, sentence)) {
    validationResult.error = 'Contains symbols';
  } else if (!validateStructure(validator, sentence)) {
    validationResult.error = 'Contains multiple sentences';
  } else if (!validateWithoutEnglishCharacters(validator, sentence)) {
    validationResult.error = 'Contains English characters';
  } else if (!validateOthers(validator, sentence)) {
    validationResult.error = 'Other issues';
  }

  return validationResult;
}

function validateCorrectLength(validator, sentence) {
  const result =
    typeof validator.filterNumbers !== 'function' ?
      DEFAULT_VALIDATOR.filterLength(sentence) :
      validator.filterLength(sentence);

  return result;
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

function validateStructure(validator, sentence) {
  const result =
    typeof validator.filterStructure !== 'function' ?
      DEFAULT_VALIDATOR.filterStructure(sentence) :
      validator.filterStructure(sentence);

  return result;
}

function validateWithoutEnglishCharacters(validator, sentence) {
  const result =
    typeof validator.filterEnglishCharacters !== 'function'
      ? true
      : validator.filterEnglishCharacters(sentence);

  return result;
}

function validateOthers(validator, sentence) {
  const result =
    typeof validator.filterOthers !== 'function'
      ? true
      : validator.filterOthers(sentence);

  return result;
}

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}
