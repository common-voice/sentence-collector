// Notes
// - Thai Unicode range: \u0E00-\u0E7F
// - Thai sentence is written without space between words.
// See discussion here:
// https://github.com/Common-Voice/sentence-collector/issues/318

// We count chars to validate instead of words.
// Target max time length for recorded speech: 7-10 seconds
const MIN_LENGTH = 2;
const MAX_LENGTH = 80;

// Numbers that are not allowed in a sentence depending on the language. For
// English this is 0-9 once or multiple times after each other.
// Thai digits: \u0E50-\u0E59 (๐-๙)
const NUMBERS_REGEX = /[0-9๐-๙]+/;

// Some languages want to check the structure, this is what this REGEX is for.
//
// Sentence with running characters of 55 or more without a space is considered difficult to read.
//
// These classes of Thai characters are not allowed to be immediately repeated:
// - Lead vowels: \u0E40\u0E41\u0E42\u0E43\u0E44
// - Follow vowels: \u0E30\u0E32\u0E33\u0E45
// - Above vowels: \u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47
// - Below vowels: \u0E38\u0E39
// - Tone marks: \u0E48\u0E49\u0E4A\u0E4B
// - Phinthu: \u0E3A
// - Thanthakhat: \u0E4C
// - Nikhahit: \u0E4D
// - Yamakkan: \u0E4E
//
// These classes of Thai characters have a specific legitimate order.
// - Tone marks/Pinthu/Thanthakat/Nikhahit/Yamakkan can't immediately come after lead and follow vowels
// - Tone marks/Pinthu/Thanthakat/Nikhahit/Yamakkan can't immediately come before above and below vowels
const STRUCTURE_REGEX = /[\u0E01-\u0E4Ea-zA-Z.,\-"'?!:;]{55,}|[\u0E40\u0E41\u0E42\u0E43\u0E44]{2,}|\u0E30{2,}|[\u0E32\u0E33\u0E45]{2,}|[\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47]{2,}|[\u0E38\u0E39]{2,}|[\u0E48\u0E49\u0E4A\u0E4B]{2,}|\u0E3A{2,}|\u0E4C{2,}|\u0E4D{2,}|\u0E4E{2,}|[\u0E40\u0E41\u0E42\u0E43\u0E44\u0E30\u0E32\u0E33\u0E45][\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E]|[\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E][\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47\u0E38\u0E39]/;
// These Thai chars cannot start the word:
// - All vowels except lead vowels
// - Tone marks
// - Phinthu, Thanthakhat, Nikhahit, Yamakkan
/* eslint-disable-next-line no-misleading-character-class */
const BEGIN_REGEX = /(^|\s+)[\u0E30\u0E32\u0E33\u0E45\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47\u0E38\u0E39\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E]/;
// These Thai chars cannot end the word:
// - Lead vowels
/* eslint-disable-next-line no-misleading-character-class */
const END_REGEX = /[\u0E40\u0E41\u0E42\u0E43\u0E44](\s+|$)/;

// The following symbols are disallowed,
// please update here as well and not just the regex
// to make it easier to read:
// < > + * \ # @ ^ [ ] ( ) /
// Paiyannoi: \u0E2F ฯ (ellipsis, abbreviation)
// Maiyamok: \u0E46 ๆ (repetition)
// Fongman: \u0E4F ๏ (used as bullet)
// Angkhankhu: \u0E5A ๚ (used to mark end of section/verse)
// Khomut: \u0E5B ๛ (used to mark end of chapter/document)
//
// Latin characters are disallowed as well,
// as they can introduce difficulty for pronunciation.
//
// Anything that is NOT in Thai character range, whitespaces,
// and allowed set of puncutations (mainly to remove emojis).
const SYMBOL_REGEX = /[<>+*\\#@^[\]()/\u0E2F\u0E46\u0E4F\u0E5A\u0E5B]|[A-Za-z]+|[^0-9\u200b\u200c\u0e01-\u0e2e\u0e30-\u0e39\u0e40-\u0e45\u0e47-\u0e4c‘’‚;:“”\u0020\u0022\u0027\u0060\-\.]/;

// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
const ABBREVIATION_REGEX = /[A-Z]{2,}|[A-Z]+\.*[A-Z]+|[ก-ฮ]+\.([ก-ฮ]+\.)+/;

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
  return !(sentence.match(STRUCTURE_REGEX)
    || sentence.match(BEGIN_REGEX)
    || sentence.match(END_REGEX));
}

function filterLength(sentence) {
  return sentence.length >= MIN_LENGTH
    && sentence.length <= MAX_LENGTH;
}
