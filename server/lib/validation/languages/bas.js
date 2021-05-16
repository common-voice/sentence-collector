const INVALIDATIONS = [{
  regex: /\s\.$/,
  error: 'Sentence should not end with a space and a period',
}, {
  regex: /!\.$/,
  error: 'Sentence should not end with a exclamation mark and a period',
}, {
  regex: /;$/,
  error: 'Sentence should not end with a semicolon',
}, {
  regex: /,$/,
  error: 'Sentence should not end with a comma',
}];

module.exports = {
  INVALIDATIONS,
};
