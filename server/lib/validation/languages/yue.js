// Minimum of words that qualify as a sentence.
const MIN_LENGTH = 3;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_LENGTH = 50;

const INVALIDATIONS = [{
    fn: (sentence) => {
      return sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH;
    },
    error: `Number of characters must be between ${MIN_LENGTH} and ${MAX_LENGTH} (inclusive)`,
  },
  {
    regex: /[0-9]+/,
    error: "Sentence should not contain numbers",
  },
  {
    regex: /[<>+*#@%^[\]()/]/,
    error: "Sentence should not contain symbols",
  },
  {
    // Any words consisting of uppercase letters or uppercase letters with a period
    // inbetween are considered abbreviations or acronyms.
    // This currently also matches fooBAR but we most probably don't want that either
    // as users wouldn't know how to pronounce the uppercase letters.
    regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
    error: "Sentence should not contain abbreviations",
  },
];

module.exports = {
  INVALIDATIONS,
};