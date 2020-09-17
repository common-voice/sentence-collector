import test from 'ava';
import * as fr from '../../../../lib/cleanup/languages/fr';

test('[FR] no space after opening \'(\' or \'[\'', t => {
  const orig = [
    'this is ( wrong',
    'this is [ wrong',
  ];

  const expected = [
    'this is (wrong',
    'this is [wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] no space before closing \')\' or \']\'', t => {
  const orig = [
    'this is ) wrong',
    'this is ] wrong',
  ];

  const expected = [
    'this is) wrong',
    'this is] wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] no space before/after single quote', t => {
  const orig = [
    'this is \' wrong',
  ];

  const expected = [
    'this is\'wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] no space before/after hyphen', t => {
  const orig = [
    'this is - wrong',
  ];

  const expected = [
    'this is-wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] no starting/ending commas', t => {
  const orig = [
    ',this is wrong',
    ', this is wrong',
    'this is wrong,,,,',
    'this is wrong,',
  ];

  const expected = [
    'this is wrong',
    'this is wrong',
    'this is wrong',
    'this is wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] no space before/space after single punctuation', t => {
  const orig = [
    'this is , wrong',
    'this is,wrong',
    'this is . wrong',
    'this is.wrong',
    'this is … wrong',
    'this is…wrong',
  ];

  const expected = [
    'this is, wrong',
    'this is, wrong',
    'this is. wrong',
    'this is. wrong',
    'this is… wrong',
    'this is… wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] space before/space after double punctuation', t => {
  const orig = [
    'this is:wrong',
    'this is: wrong',
    'this is :wrong',
    'this is;wrong',
    'this is; wrong',
    'this is ;wrong',
    'this is wrong?',
    'this is?wrong',
    'this is  ?  wrong',
    'this is ?wrong',
    'this is? wrong',
    'this is wrong!',
    'this is!wrong',
    'this is  !  wrong',
    'this is !wrong',
    'this is! wrong',
  ];

  const expected = [
    'this is : wrong',
    'this is : wrong',
    'this is : wrong',
    'this is ; wrong',
    'this is ; wrong',
    'this is ; wrong',
    'this is wrong ?',
    'this is ? wrong',
    'this is ? wrong',
    'this is ? wrong',
    'this is ? wrong',
    'this is wrong !',
    'this is ! wrong',
    'this is ! wrong',
    'this is ! wrong',
    'this is ! wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] merge consecutive dots into unicode elipsis', t => {
  const orig = [
    'this is .. wrong',
    'this is ... wrong',
  ];

  const expected = [
    'this is. . wrong',
    'this is… wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('[FR] do not keep multiple spaces', t => {
  const orig = [
    'this is   wrong',
    'this              is      very     wrong',
  ];

  const expected = [
    'this is wrong',
    'this is very wrong',
  ];

  const computed = fr.clean(orig);

  t.deepEqual(computed, expected);
});

test('should sort', (t) => {
  const input = ['Hi', 'Hello'];
  const expected = input.sort();
  const result = fr.sortSentences(input);
  t.deepEqual(result, expected);
});
