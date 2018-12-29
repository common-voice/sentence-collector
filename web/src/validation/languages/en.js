const MAX_WORDS = 14;
const NUMBERS_REGEX = /[0-9]+/;

export function getMaxLength() {
  return MAX_WORDS;
}

export function filterNumbers(sentences) {
  const filtered = [];
  const valid = sentences.filter(sentence => {
    if (sentence.match(NUMBERS_REGEX)) {
      filtered.push(sentence);
      return false;
    }

    return true;
  });

  return { valid, filtered };
}