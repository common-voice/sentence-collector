import test from 'ava';
import * as en from '../../../../shared/cleanup/languages/en';

function clean(t, input, expected) {
  const cleaned = en.clean(input);
	t.deepEqual(cleaned, expected);
}

test('[EN] removes multiple spaces', clean, ['this is  wrong'], ['this is wrong']);
test('[EN] removes space before colon', clean, ['this is : wrong'], ['this is: wrong']);
test('[EN] removes space before comma', clean, ['this is , wrong'], ['this is, wrong']);
test('[EN] removes space before period', clean, ['this is wrong .'], ['this is wrong.']);
test('[EN] removes space before question mark', clean, ['this is wrong ?'], ['this is wrong?']);
test('[EN] removes space before exclamation mark', clean, ['this is wrong !'], ['this is wrong!']);
test('[EN] removes comma at beginning of sentence', clean, [',this is wrong'], ['this is wrong']);
test('[EN] removes comma at beginning of sentence with space', clean, [', this is wrong'], ['this is wrong']);
test('[EN] removes comma at end of sentence', clean, ['this is wrong,'], ['this is wrong']);
test('[EN] removes several multiple spaces', clean,
  ['this is  wrong  on two levels', 'this is  wrong       on two levels'],
  ['this is wrong on two levels', 'this is wrong on two levels'],
);
test('[EN] removes several multiple space before colon', clean, ['this is : wrong'], ['this is: wrong']);
test('[EN] removes several spaces before comma', clean, ['this is , wrong , too'], ['this is, wrong, too']);
// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several spaces before period', clean,
  ['this is wrong . And wrong too .'], ['this is wrong. And wrong too.']);
// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several space before question mark', clean,
  ['this is wrong ? And wrong too ?'], ['this is wrong? And wrong too?']);
// In theory it's invalid anyway but we never know if it eventually exists in SC.
test('[EN] removes several spaces before exclamation mark', clean,
  ['this is wrong ! And wrong too !'], ['this is wrong! And wrong too!']);
test('[EN] removes multiple commas at beginning of sentence', clean, [',,,,this is wrong'], ['this is wrong']);
test('[EN] removes multiple commas at beginning of sentence with space', clean, [',,,,, this is wrong'], ['this is wrong']);
test('[EN] removes multiple commas at end of sentence', clean, ['this is wrong,,,,'], ['this is wrong']);
