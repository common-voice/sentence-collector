const defaultValidator = require('./languages/default');
const bas = require('./languages/bas');
const ca = require('./languages/ca');
const ckb = require('./languages/ckb');
const en = require('./languages/en');
const eo = require('./languages/eo');
const fr = require('./languages/fr');
const ig = require('./languages/ig');
const it = require('./languages/it');
const kab = require( './languages/kab');
const ko = require( './languages/ko');
const ne = require('./languages/ne');
const or = require('./languages/or');
const ru = require('./languages/ru');
const th = require('./languages/th');
const tok = require('./languages/tok');
const ur = require('./languages/ur');
const uz = require('./languages/uz');
const yue = require('./languages/yue');

const VALIDATORS = {
  bas,
  ca,
  ckb,
  en,
  eo,
  fr,
  ig,
  it,
  kab,
  ko,
  ne,
  or,
  ru,
  th,
  tok,
  ur,
  uz,
  yue,
};

// For certain language we want to normalize before we validate.
// This then also means that the returned sentence is normalized
// and therefore will be saved to the database in normalized form.
const USE_NFC_NORMALIZATION = [
  'ko',
];

module.exports = {
  validateSentences,
};

function validateSentences(language, sentences) {
  const validator = getValidatorFor(language);

  return runValidation(validator, {
    sentences,
    normalize: USE_NFC_NORMALIZATION.includes(language),
  });
}

function runValidation(validator, { sentences = { unreviewed: [], validated: [] }, normalize }) {
  let filtered = [];

  const validate = (validSentences, sentence) => {
    const sentenceToValidate = normalize ? sentence.normalize('NFC') : sentence;
    const validationResult = validateSentence(validator, sentenceToValidate);
    if (validationResult.error) {
      filtered.push(validationResult);
      return validSentences;
    }

    validSentences.push(sentenceToValidate);
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
  return VALIDATORS[language] || defaultValidator;
}
