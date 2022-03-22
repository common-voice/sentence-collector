const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 18;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `toki ni li ken jo e nimi pi mute ni taso: ${MIN_WORDS}-${MAX_WORDS}`,
}, {
  regex: /[0-9]+/,
  error: 'nanpa o lon ala toki ni',
}, {
  regex: /[<>+*#@%^[\]()/]/,
  error: 'sitelen nasa o lon ala toki ni',
}, {
  // capital letters at start of word only
  regex: /[\w\.][A-Z]/,
  error: 'sitelen suli li ken lon open nimi taso (ike: "jan AwiPota"; pona: "jan Awipota", "jan Awi Pota")',
},

// The following invalidations are to make all submissions conform to Toki Pona's
// phonotactics. Any words that don't follow the phonotactics would have ambiguous
// pronunciations, and some speakers might struggle pronouncing them.

{
  // No non-Toki-Pona letters; no Sitelen Pona
  regex: /[BbCcDdFfGgHhQqRrVvXxYyZz\u00C0-\u02BF\u1E00-\u1EFF\uF1900-\uF19FF]/,
  error: 'o kepeken sitelen Lasina pi toki pona taso',
}, {
  // No consecutive vowels
  regex: /[AaEeIiOoUu]{2,}/,
  error: 'sitelen "a e i o u" tu li ken ala lon poka',
}, {
  // No consecutive consonants (excluding N)
  regex: /[JjKkLlMmPpSsTtWw]{2,}/,
  error: 'sitelen "j k l m p s t w" tu li ken ala lon poka',
}, {
  // No word-final consonants other than N
  regex: /[JjKkLlMmPpSsTtWw]\b/,
  error: 'sitelen "j k l m p s t w" li ken ala lon pini nimi',
}, {
  // No N preceded by a consonant
  regex: /[JjKkLlMmPpSsTtWw]n/,
  error: 'sitelen "j k l m p s t w" li ken ala lon poka open pi sitelen "n"',
}, {
  // No "nn" or "nm"
  regex: /[Nn][mn]/,
  error: 'sitelen "nn" en sitelen "nm" li ken ala',
}, {
  // No word-initial "n + consonant" sequences
  regex: /\b[Nn][jklmpstw]/,
  error: 'sitelen "n" li lon open nimi la sitelen "j k l m p s t w" li ken ala sitelen nanpa tu',
}, {
  // No invalid syllables
  regex: /(Wu|wu|Wo|wo|Ji|ji|Ti|ti)/,
  error: 'sitelen "wu wo ji ti" li ken ala',
}];


module.exports = {
  INVALIDATIONS,
};
