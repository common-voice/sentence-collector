// Amount of characters allowed per sentence to keep recordings in a manageable duration.
const MIN_LENGTH = 1;
const MAX_LENGTH = 90;

const INVALIDATIONS = [{
  fn: (sentence) => {
    return sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH;
  },
  error: `toki sitelen ni li suli ike, li ken jo e sitelen lili pi mute ni taso: ${MIN_LENGTH}-${MAX_LENGTH}`,
}, {
  regex: /[0-9]+/,
  error: 'nanpa o lon ala toki ni',
}, {
  regex: /[<>+*#@%^[\]()/]/,
  error: 'sitelen nasa o lon ala toki ni',
}, {
  // capital letters at start of word only; no abbreviations
  regex: /\w[A-Z]|[A-Z]\.[A-Z]/,
  error: 'sitelen suli li ken lon open nimi taso (ike: "jan AwiPota"; pona: "jan Awipota", "jan Awi Pota")',
},

// The following invalidations are to make all submissions conform to Toki Pona's
// phonotactics. Any words that don't follow the phonotactics would have ambiguous
// pronunciations, and some speakers might struggle pronouncing them.

{
  // No non-Toki-Pona letters
  regex: /[BbCcDdFfGgHhQqRrVvXxYyZzÀ-ʯḀ-ỿ]/,
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
  regex: /Wu|wu|Wo|wo|Ji|ji|Ti|ti/,
  error: 'sitelen "wu wo ji ti" li ken ala',
}];


module.exports = {
  INVALIDATIONS,
};
