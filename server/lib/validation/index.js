const bas = require('./languages/bas');
const en = require('./languages/en');
const eo = require('./languages/eo');
const ig = require('./languages/ig');
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
  eo,
  ig,
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
    sentence,
  };

  // We use `some` so we stop once an invalid condition is found
  validator.INVALIDATIONS.some((invalidation) => {
    let invalid = false;

    if (invalidation.fn && typeof invalidation.fn === 'function') {
      invalid = invalidation.fn(sentence);
    } else if (invalidation.regex) {
      invalid = sentence.match(invalidation.regex);
    }

    if (invalid) {
      validationResult.error = invalidation.error;
    }

    return invalid;
  });

  return validationResult;
}

function getValidatorFor(language) {
  return VALIDATORS[language] || DEFAULT_VALIDATOR;
}
