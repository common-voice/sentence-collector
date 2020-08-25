// We count chars to validate instead of words.
const MIN_LENGTH = 2;
const MAX_LENGTH = 150;

// Numbers that are not allowed in a sentence depending on the language. For
// English this is 0-9 once or multiple times after each other.
// Thai digits: \u0E50-\u0E59 (๐-๙)
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
// * Lead vowels: \u0E40\u0E41\u0E42\u0E43\u0E44
// - Follow vowels: \u0E30\u0E32\u0E33\u0E45
// - Above vowels: \u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47
// - Below vowels: \u0E38\u0E39
// - Tone marks: \u0E48\u0E49\u0E4A\u0E4B
// - Phinthu: \u0E3A
// - Thanthakhat: \u0E4C
// - Nikhahit: \u0E4D
// - Yamakkan: \u0E4E
// The class with (*) symbol can't end the word.
// The class with (-) symbol can't start the word.
/* eslint-disable-next-line no-useless-escape */
// const SYMBOL_REGEX = /[<>\+\*\\#@\^\[\]\(\)\/]|[A-Za-z]{3,}|[\u0E40\u0E41\u0E42\u0E43\u0E44]{2,}|[\u0E30]{2,}|[\u0E32\u0E33\u0E45]{2,}|[\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47]{2,}|[\u0E38\u0E39]{2,}|[\u0E48\u0E49\u0E4A\u0E4B]{2,}|[\u0E3A]{2,}|[\u0E4C]{2,}|[\u0E4D]{2,}|[\u0E4E]{2,}|(^|\W)[\u0E30\u0E32\u0E33\u0E45\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47\u0E38\u0E39\u0E48\u0E49\u0E4A\u0E4B\u0E3A\u0E4C\u0E4D\u0E4E]|[\u0E40\u0E41\u0E42\u0E43\u0E44]($|\W)/u;
const SYMBOL_REGEX = /[<>+*\\#@^[\]()/]|[A-Za-z]{3,}|[\u0E40\u0E41\u0E42\u0E43\u0E44]{2,}|\u0E30{2,}|[\u0E32\u0E33\u0E45]{2,}|[\u0E31\u0E34\u0E35\u0E36\u0E37\u0E4D\u0E47]{2,}/;

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
