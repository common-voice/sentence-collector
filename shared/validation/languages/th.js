// Notes
// - Thai Unicode range: \u0E00-\u0E7F
// - Thai sentence is written without space between words.
// See discussion here:
// https://github.com/Common-Voice/sentence-collector/issues/318

// We count chars to validate instead of words.
// Target max time length for recorded speech: 7-10 seconds
const MIN_LENGTH = 2;
const MAX_LENGTH = 110;

// Numbers that are not allowed in a sentence depending on the language. For
// English this is 0-9 once or multiple times after each other.
// Thai digits: \u0E50-\u0E59 (๐-๙)
const NUMBERS_REGEX = /[0-9๐-๙]+/;

// Some languages want to check the structure, this is what this REGEX is for. For English
// (and by extend as default) we're not currently using it.
//
// Rules for Thai:
// Sentence with running characters of 80 or more without a space is considered difficult to read.
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
//
// We will limit the use of Maiyamok (\u0E46 repetition mark) to just one time per word.
/* eslint-disable-next-line no-useless-escape */
const STRUCTURE_REGEX= /[\u0E01-\u0E4Ea-zA-Z\.\,\-\"\'\?\!\:\;]{80,}|[\u0E40\u0E41\u0E42\u0E43\u0E44]{2,}|\u0E30{2,}|[\u0E32\u0E33\u0E45]{2,}|[\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47]{2,}|[\u0E38\u0E39]{2,}|[\u0E48\u0E49\u0E4A\u0E4B]{2,}|\u0E3A{2,}|\u0E4C{2,}|\u0E4D{2,}|\u0E4E{2,}|[\u0E40\u0E41\u0E42\u0E43\u0E44\u0E30\u0E32\u0E33\u0E45][\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E]|[\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E][\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47\u0E38\u0E39]|(\u0E46[ ]?){2,}/;

// The following symbols are disallowed, please update here as well and not just the regex
// to make it easier to read:
// < > + * \ # @ ^ [ ] ( ) /
// Fongman: \u0E4F ๏
// Angkhankhu: \u0E5A ๚
// Khomut: \u0E5B ๛
//
// Latin characters with length of 3 or more are disallowed as well,
// as they can be foriegn (non-Thai) language.
/* eslint-disable-next-line no-useless-escape */
const SYMBOL_REGEX = /[<>+*\\#@^[\]()/\u0E4F\u0E5A\u0E5B]|[A-Za-z]{3,}/;

// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
const ABBREVIATION_REGEX = /[A-Z]{2,}|[A-Z]+\.*[A-Z]+|[ก-ฮ]+\.([ก-ฮ]+\.)+/;

export function filterNumbers(sentence) {
  return !sentence.match(NUMBERS_REGEX);
}

export function filterAbbreviations(sentence) {
  return !sentence.match(ABBREVIATION_REGEX);
}

export function filterSymbols(sentence) {
  return !sentence.match(SYMBOL_REGEX);
}

export function filterStructure(sentence) {
  return !sentence.match(STRUCTURE_REGEX);
}

export function filterLength(sentence) {
  return sentence.length >= MIN_LENGTH
    && sentence.length <= MAX_LENGTH;
}
