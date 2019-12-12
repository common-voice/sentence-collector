import test from 'ava';
import * as en from '../../../../shared/cleanup/languages/en';

test('[EN] removes multiple spaces', t => {
  const input = ['this is  wrong'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes space before colon', t => {
  const input = ['this is : wrong'];
  const expected = ['this is: wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes space before comma', t => {
  const input = ['this is , wrong'];
  const expected = ['this is, wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes space before period', t => {
  const input = ['this is wrong .'];
  const expected = ['this is wrong.'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes space before question mark', t => {
  const input = ['this is wrong ?'];
  const expected = ['this is wrong?'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes space before exclamation mark', t => {
  const input = ['this is wrong !'];
  const expected = ['this is wrong!'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes comma at beginning of sentence', t => {
  const input = [',this is wrong'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes comma at beginning of sentence with space', t => {
  const input = [', this is wrong'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes comma at end of sentence', t => {
  const input = ['this is wrong,'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes several multiple spaces', t => {
  const input = ['this is  wrong  on two levels', 'this is  wrong       on two levels'];
  const expected = ['this is wrong on two levels', 'this is wrong on two levels'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes several multiple space before colon', t => {
  const input = ['this is : wrong'];
  const expected = ['this is: wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes several spaces before comma', t => {
  const input = ['this is , wrong , too'];
  const expected = ['this is, wrong, too'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several spaces before period', t => {
  const input = ['this is wrong . And wrong too .'];
  const expected = ['this is wrong. And wrong too.'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several space before question mark', t => {
  const input = ['this is wrong ? And wrong too ?'];
  const expected = ['this is wrong? And wrong too?'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several spaces before exclamation mark', t => {
  const input = ['this is wrong ! And wrong too !'];
  const expected = ['this is wrong! And wrong too!'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes multiple commas at beginning of sentence', t => {
  const input = [',,,,this is wrong'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes multiple commas at beginning of sentence with space', t => {
  const input = [',,,,, this is wrong'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});

test('[EN] removes multiple commas at end of sentence', t => {
  const input = ['this is wrong,,,,'];
  const expected = ['this is wrong'];

  const computed = en.clean(input);

  t.deepEqual(computed, expected);
});
