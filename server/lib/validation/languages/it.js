// According to Mozilla Italia guidelines, we count chars to validate instead of words.
const MIN_LENGTH = 1;
const MAX_LENGTH = 125;

// Numbers that are not allowed in a sentence depending on the language.
const NUMBERS_REGEX = /[0-9]+/;

// Checks whether the sentence has a ? or ! character in the middle, as it could mean
// more sentences per line.
const STRUCTURE_REGEX = /[?!.].+/;

/* eslint-disable-next-line no-useless-escape */
// Italian: Simboli non permessi, aggiungere anche qui sotto oltre che nella regex:
// < > + * \ # @ ^ “ ” ‘ ’ ( ) É [ ] / { }
//doppio " " e più di un "." nella stessa frase.
const SYMBOL_REGEX = /[<>+*\\#@^“”‘’(){}É[\]/]|\s{2,}|!{2,}/;
// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
// Versione italiana: dag7dev
const ABBREVIATION_REGEX = /[A-Z]{2,}|[A-Z][a-z]+\.*[A-Z]+/;

module.exports = {
  filterNumbers,
  filterAbbreviations,
  filterSymbols,
  filterStructure,
  filterLength,
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

function filterLength(sentence) {
  return sentence.length >= MIN_LENGTH
      && sentence.length <= MAX_LENGTH;
}
