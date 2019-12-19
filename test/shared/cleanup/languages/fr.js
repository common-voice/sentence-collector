import test from 'ava';
import * as fr from '../../../../shared/cleanup/languages/fr';

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
