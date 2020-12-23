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
  error: 'Sentence too long',
}, {
  sentence: 'This is very very very very very very very very very very very very very very very very very very very very long too',
  error: 'Sentence too long',
}]);

test('validates invalid sentences - contains numbers', validate, 'en', {
  unreviewed: ['This is 2valid'],
  validated: ['This is 3valid'],
}, [{
  sentence: 'This is 2valid',
  error: 'Contains numbers',
}, {
  sentence: 'This is 3valid',
  error: 'Contains numbers',
}]);

test('validates invalid sentences - contains abbreviation', validate, 'en', {
  unreviewed: ['This is A.B.C.'],
  validated: ['This ABC too'],
}, [{
  sentence: 'This is A.B.C.',
  error: 'Contains abbreviations',
}, {
  sentence: 'This ABC too',
  error: 'Contains abbreviations',
}]);

test('validates invalid sentences - contains symbols', validate, 'en', {
  unreviewed: ['This is # test'],
  validated: ['This is @ test'],
}, [{
  sentence: 'This is # test',
  error: 'Contains symbols',
}, {
  sentence: 'This is @ test',
  error: 'Contains symbols',
}]);

test('validates invalid sentences - multiple sentences', validate, 'it', {
  unreviewed: ['This is test. And more.'],
  validated: ['This is one. This is two.'],
}, [{
  sentence: 'This is test. And more.',
  error: 'Contains multiple sentences',
}, {
  sentence: 'This is one. This is two.',
  error: 'Contains multiple sentences',
}]);

test('validates invalid sentences - english chars', validate, 'ru', {
  unreviewed: ['This is test'],
  validated: ['This too'],
}, [{
  sentence: 'This is test',
  error: 'Contains English characters',
}, {
  sentence: 'This too',
  error: 'Contains English characters',
}]);

test('validates invalid sentences - other rules', validate, 'bas', {
  unreviewed: ['This is valid', 'This is wrong .', 'This as well!.', 'No;', 'Definitely not,'],
  validated: ['This too'],
}, [{
  sentence: 'This is wrong .',
  error: 'Other issues',
}, {
  sentence: 'This as well!.',
  error: 'Other issues',
}, {
  sentence: 'No;',
  error: 'Other issues',
}, {
  sentence: 'Definitely not,',
  error: 'Other issues',
}]);
