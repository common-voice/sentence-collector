const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 10;

// Numbers that are not allowed in a sentence depending on the language. For
// English this is 0-9 once or multiple times after each other.
const NUMBERS_REGEX = /[०-९0-9]+/;

// Checks whether the sentence has a ? or । character in the middle, as it could mean
/* eslint-disable-next-line no-unused-vars */
const STRUCTURE_REGEX = /[?।!].+/;

// The following symbols are disallowed, please update here as well and not just the regex
// to make it easier to read:
// < > + * \ # @ ^ [ ] ( ) /
/* eslint-disable-next-line no-useless-escape */
const SYMBOL_REGEX = /[<>\+\*\\#@\^\[\]\(\)\/]/;
// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
const ABBREVIATION_REGEX = /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/;

const ENGLISH_ALPHABETS_REGEX = /[a-zA-Z]/;

module.exports = {
  filterNumbers,
  filterAbbreviations,
  filterSymbols,
  filterStructure,
  filterLength,
  filterEnglishCharacters,
};

function filterNumbers(sentence) {
  return !sentence.match(NUMBERS_REGEX);
}

function filterAbbreviations(sentence) {
  return !sentence.match(ABBREVIATION_REGEX);
}

function filterSymbols(sentence) {
  return !sentence.match(SYMBOL_REGEX);
}

function filterStructure(sentence) {
  return !sentence.match(STRUCTURE_REGEX);
}

function filterEnglishCharacters(sentence) {
  return !sentence.match(ENGLISH_ALPHABETS_REGEX);
}

function filterLength(sentence) {
  const words = tokenizeWords(sentence);
  return words.length >= MIN_WORDS && words.length <= MAX_WORDS;
}
