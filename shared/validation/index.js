import * as en from './languages/en';
import * as it from './languages/it';
import * as ne from './languages/ne';
import * as od from './languages/od';

const VALIDATORS = {
  en,
  it,
  ne,
  od,
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

  if (!validateStructure(validator, sentence)) {
    validationResult.error = 'Contains multiple sentences';
    return validationResult;
  }
  
  if (!validateWithoutEnglishCharacters(validator, sentence)) {
    validationResult.error = 'Contains english characters';
    return validationResult;
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

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}