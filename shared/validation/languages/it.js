// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration. 
// Italian: finché non abbiamo il controllo sui caratteri, o quello che tiene conto della presenza di numeri, metto 17 parole che dovrebbero essere salvo rarissimi casi sempre entro il limite di 125 caratteri. 
const MAX_WORDS = 17;

// Numbers that are not allowed in a sentence depending on the language. For
// Italian: tutti i numeri sono consentiti ma se e quando avremo la possibilità di fare regole personalizzate metteremo una condizione ulteriore sulla lunghezza se vi sono dei numeri nella frase.
const NUMBERS_REGEX = /[0-9]+/;

/* eslint-disable-next-line no-useless-escape */
// Italian: Simboli non permessi, aggiungere anche qui sotto oltre che nella regex:
// “ ” ‘ ’ ( ) É 
//doppio " " e più di un "." nella stessa frase.
const SYMBOL_REGEX = /[<>\+\*\\#@\^“”‘’()É\[\]\/]|\s{2,}|\..*\./;
// Any words consisting of uppercase letters or uppercase letters with a period
// inbetween are considered abbreviations or acronyms.
// This currently also matches fooBAR but we most probably don't want that either
// as users wouldn't know how to pronounce the uppercase letters.
// Versione italiana: dag7dev (da fixare)
const ABBREVIATION_REGEX = /[A-Z][a-z]{2,}|[A-Z][a-z]+\.*[A-Z][a-z]+/;


export function getMaxLength() {
  return MAX_WORDS;
}

export function getMinLength() {
  return MIN_WORDS;
}

export function filterNumbers(sentence) {
  return !sentence.match(NUMBERS_REGEX);
}

export function filterAbbreviations(sentence) {
  return !sentence.match(ABBREVIATION_REGEX);
}

export function filterSymbols(sentence) {
  return !sentence.match(SYMBOL_REGEX);
}
