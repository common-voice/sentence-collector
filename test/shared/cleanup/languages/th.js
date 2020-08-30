import test from 'ava';
import * as th from '../../../../shared/cleanup/languages/th';

function clean(t, input, expected) {
  const cleaned = th.clean(input);
  t.deepEqual(cleaned, expected);
}

test('condenses multiple Maiyamok', clean, ['this is wrong ๆๆ ๆ   ๆ'], ['this is wrong ๆ']);
test('add a space before and after Maiyamok', clean, ['this isๆ wrong'], ['this is ๆ wrong']);
test('removes multiple spaces', clean, ['this is  wrong'], ['this is wrong']);
test('removes space before colon', clean, ['this is : wrong'], ['this is: wrong']);
test('removes comma', clean, ['this is , wrong'], ['this is wrong']);
test('removes exclamation mark', clean, ['this is wrong !'], ['this is wrong']);
test('removes question mark', clean, ['this is wrong ?'], ['this is wrong']);
test('removes ellipsis', clean, ['this is wrong ...'], ['this is wrong']);
test('removes ellipsis', clean, ['this is wrong. . . ... '], ['this is wrong']);
test('removes period at end of sentence', clean, ['this is wrong.'], ['this is wrong']);
test('removes period at end of sentence with space', clean, ['this is wrong.  '], ['this is wrong']);
test('removes several multiple spaces', clean,
  ['this is  wrong  on two levels', 'this is  wrong       on two levels'],
  ['this is wrong on two levels', 'this is wrong on two levels'],
);
test('removes several multiple space before colon', clean, ['this is : wrong'], ['this is: wrong']);
test('removes several spaces before comma', clean, ['this is , wrong , too'], ['this is wrong too']);
test('removes several spaces before period', clean,
  ['this is wrong . And wrong too .'], ['this is wrong. And wrong too.']);
test('removes several question marks', clean,
  ['this is wrong ? And wrong too ?'], ['this is wrong And wrong too']);
test('removes several exclamation marks', clean,
  ['this is wrong ! And wrong too !'], ['this is wrong And wrong too']);
test('removes multiple periods at beginning of sentence', clean, ['...this is wrong'], ['this is wrong']);
test('removes multiple periods at beginning of sentence with space', clean, ['... this is wrong'], ['this is wrong']);
test('removes multiple periods at end of sentence', clean, ['this is wrong...'], ['this is wrong']);
