import test from 'ava';
import validation from '../../../lib/validation';

function validate(t, language, sentences, expected) {
  const validationResult = validation.validateSentences(language, sentences);
  t.log(validationResult.filtered);
  t.deepEqual(validationResult.filtered, expected);
}

test('validates valid sentences', validate, 'en', {
  unreviewed: ['This is valid'],
  validated: ['This is valid too'],
}, []);

test('validates invalid sentences - too long', validate, 'en', {
  unreviewed: ['This is very very very very very very very very very very very very very very very very very very very very long'],
  validated: ['This is very very very very very very very very very very very very very very very very very very very very long too'],
}, [{
  sentence: 'This is very very very very very very very very very very very very very very very very very very very very long',
  error: 'Number of words must be between 1 and 14 (inclusive)',
}, {
  sentence: 'This is very very very very very very very very very very very very very very very very very very very very long too',
  error: 'Number of words must be between 1 and 14 (inclusive)',
}]);

test('validates invalid sentences - contains numbers', validate, 'en', {
  unreviewed: ['This is 2valid'],
  validated: ['This is 3valid'],
}, [{
  sentence: 'This is 2valid',
  error: 'Sentence should not contain numbers',
}, {
  sentence: 'This is 3valid',
  error: 'Sentence should not contain numbers',
}]);

test('validates invalid sentences - contains abbreviation', validate, 'en', {
  unreviewed: ['This is A.B.C.'],
  validated: ['This ABC too'],
}, [{
  sentence: 'This is A.B.C.',
  error: 'Sentence should not contain abbreviations',
}, {
  sentence: 'This ABC too',
  error: 'Sentence should not contain abbreviations',
}]);

test('validates invalid sentences - contains symbols', validate, 'en', {
  unreviewed: ['This is # test'],
  validated: ['This is @ test', 'This is / test'],
}, [{
  sentence: 'This is # test',
  error: 'Sentence should not contain symbols',
}, {
  sentence: 'This is @ test',
  error: 'Sentence should not contain symbols',
}, {
  sentence: 'This is / test',
  error: 'Sentence should not contain symbols',
}]);

test('validates invalid sentences - multiple sentences', validate, 'it', {
  unreviewed: ['This is test. And more.'],
  validated: ['This is one. This is two.'],
}, [{
  sentence: 'This is test. And more.',
  error: 'Sentence should not contain sentence punctuation inside a sentence',
}, {
  sentence: 'This is one. This is two.',
  error: 'Sentence should not contain sentence punctuation inside a sentence',
}]);

test('validates invalid sentences - english chars', validate, 'ru', {
  unreviewed: ['This is test'],
  validated: ['This too'],
}, [{
  sentence: 'This is test',
  error: 'Sentence should not contain latin alphabet characters',
}, {
  sentence: 'This too',
  error: 'Sentence should not contain latin alphabet characters',
}]);

test('validates invalid sentences - other rules', validate, 'bas', {
  unreviewed: ['This is valid', 'This is wrong .', 'This as well!.', 'No;', 'Definitely not,'],
  validated: ['This too'],
}, [{
  sentence: 'This is wrong .',
  error: 'Sentence should not end with a space and a period',
}, {
  sentence: 'This as well!.',
  error: 'Sentence should not end with a exclamation mark and a period',
}, {
  sentence: 'No;',
  error: 'Sentence should not end with a semicolon',
}, {
  sentence: 'Definitely not,',
  error: 'Sentence should not end with a comma',
}]);
