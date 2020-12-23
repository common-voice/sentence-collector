module.exports = {
  filterOthers,
};

function filterOthers(sentence) {
  return !sentence.endsWith(' .') &&
    !sentence.endsWith('!.') &&
    !sentence.endsWith(';') &&
    !sentence.endsWith(',');
}
