// We count chars to validate instead of words.
const MIN_LENGTH = 2;
const MAX_LENGTH = 150;

// Numbers that are not allowed in a sentence depending on the language. For
// English this is 0-9 once or multiple times after each other.
// Thai digits: \u0e50-\u0e59 (๐-๙)
const NUMBERS_REGEX = /[0-9๐-๙]+/;

// Some languages want to check the structure, this is what this REGEX is for. For English
// (and by extend as default) we're not currently using it.
/* eslint-disable-next-line no-unused-vars */
const STRUCTURE_REGEX = undefined;

// The following symbols are disallowed, please update here as well and not just the regex
// to make it easier to read:
// < > + * \ # @ ^ [ ] ( ) /
//
// Latin characters with length of 3 or more are disallowed as well,
// as they can be foriegn language.
//
// These classes of Thai characters are not allowed to be immediately repeated:
// * Lead vowels: \u0e40\u0e41\u0e42\u0e43\u0e44
// - Follow vowels: \u0e30\u0e32\u0e33\u0e45
// - Above vowels: \u0e31\u0e34\u0e35\u0e36\u0e37\u0e4d\u0e47
// - Below vowels: \u0e38\u0e39
// - Tone marks: \u0e48\u0e49\u0e4a\u0e4b
// - Phinthu: \u0e3a
// - Thanthakhat: \u0e4c
// - Nikhahit: \u0e4d
// - Yamakkan: \u0e4e
// The class with (*) symbol can't end the word.
// The class with (-) symbol can't start the word.
/* eslint-disable-next-line no-useless-escape */
const SYMBOL_REGEX = /[<>\+\*\\#@\^\[\]\(\)\/]|[A-Za-z]{3,}|[\u0e40\u0e41\u0e42\u0e43\u0e44]{2,}|[\u0e30]{2,}|[\u0e32\u0e33\u0e45]{2,}|[\u0e31\u0e34\u0e35\u0e36\u0e37\u0e4d\u0e47]{2,}|[\u0e38\u0e39]{2,}|[\u0e48\u0e49\u0e4a\u0e4b]{2,}|[\u0e3a]{2,}|[\u0e4c]{2,}|[\u0e4d]{2,}|[\u0e4e]{2,}|(^|\W)[\u0e30\u0e32\u0e33\u0e45\u0e31\u0e34\u0e35\u0e36\u0e37\u0e4d\u0e47\u0e38\u0e39\u0e48\u0e49\u0e4a\u0e4b\u0e3a\u0e4c\u0e4d\u0e4e]|[\u0e40\u0e41\u0e42\u0e43\u0e44]($|\W)/;

// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
const ABBREVIATION_REGEX = /[A-Zก-ฮ]{2,}|[A-Zก-ฮ]+\.*[A-Zก-ฮ]+/;

export function filterNumbers(sentence) {
  return !sentence.match(NUMBERS_REGEX);
}

export function filterAbbreviations(sentence) {
  return !sentence.match(ABBREVIATION_REGEX);
}

export function filterSymbols(sentence) {
  return !sentence.match(SYMBOL_REGEX);
}

/* eslint-disable-next-line no-unused-vars */
export function filterStructure(sentence) {
  return true;
}

export function filterLength(sentence) {
  return sentence.length >= MIN_LENGTH
    && sentence.length <= MAX_LENGTH;
}
