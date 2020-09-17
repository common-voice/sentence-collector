import test from 'ava';
import * as th from '../../../../lib/cleanup/languages/th';

function clean(t, input, expected) {
  const cleaned = th.clean(input);
  t.deepEqual(cleaned, expected);
}

test('normalize Sara E Sara E', clean, ['เรือนเเพ'], ['เรือนแพ']);
test('normalize Sara Am', clean, ['ลํานํ้า'], ['ลำน้ำ']);
test('normalizes Ru/Lu Sara Aa', clean, ['ฤา ฦา'], ['ฤๅ ฦๅ']);

test('condenses multiple Maiyamok', clean,
  ['this is wrong ๆๆ ๆ   ๆ'],
  ['this is wrong ๆ']
);

test('adds a space before and after Maiyamok', clean,
  ['this isๆ wrong'],
  ['this is ๆ wrong']
);

test('adds a space before and after colon', clean,
  ['this is:  wrong'],
  ['this is : wrong']
);
test('adds a space before and after colon, several times', clean,
  ['this : is  : wrong'],
  ['this : is : wrong']
);

test('adds a space before and after exclamation mark', clean,
  ['this is wrong!'],
  ['this is wrong !']
);
test('adds a space before and after exclamation mark, several times', clean,
  ['this is wrong !  And wrong too !'],
  ['this is wrong ! And wrong too !']
);

test('adds a space before and after question mark', clean,
  ['this is wrong?'],
  ['this is wrong ?']
);
test('adds a space before and after question mark, several times', clean,
  ['this is wrong ? And wrong too ? '],
  ['this is wrong ? And wrong too ?']
);

test('removes comma', clean, ['this is , wrong'], ['this is wrong']);
test('removes several commas', clean,
  ['this,is, wrong , too, '],
  ['this is wrong too']
);

test('removes ellipsis', clean, ['this is wrong...'], ['this is wrong']);
test('removes several ellipsis', clean,
  ['this ... is wrong . . . ... '],
  ['this is wrong']
);

test('removes orphan period', clean, ['this is wrong .'], ['this is wrong']);
test('removes another orphan period', clean,
  ['this is .wrong'],
  ['this is wrong']
);
test('removes several orphan periods', clean,
  ['this is wrong .  And wrong too .'],
  ['this is wrong And wrong too']
);

test('removes multiple periods at beginning of sentence', clean,
  ['...this is wrong'],
  ['this is wrong']
);
test('removes multiple periods at beginning of sentence with space', clean,
  ['... this is wrong'],
  ['this is wrong']
);
test('removes multiple periods at end of sentence', clean,
  ['this is wrong...'],
  ['this is wrong']
);

test('retains immediate period', clean,
  ['this is wrong.'],
  ['this is wrong.']
);

test('removes spaces at begining of sentence', clean,
  ['   this is wrong.'],
  ['this is wrong.']
);
test('removes spaces at end of sentence', clean,
  ['this is wrong.  '],
  ['this is wrong.']
);

test('removes multiple spaces', clean, ['this is  wrong'], ['this is wrong']);
test('removes multiple spaces, several times', clean,
  ['this is  wrong  on two levels', 'this is  wrong       on two levels'],
  ['this is wrong on two levels', 'this is wrong on two levels'],
);
