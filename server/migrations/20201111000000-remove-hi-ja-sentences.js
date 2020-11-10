'use strict'

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.serialize.query(`
      DELETE FROM Sentences
        WHERE (localeId="hi" AND source="https://tatoeba.org/eng")
	  OR (localeId="ja" AND (
            source="http://d.hatena.ne.jp/satoru_net/20151030/1446184756" OR
	    source="https://github.com/voice-statistics/voice-statistics.github.com/blob/master/assets/doc/balance_sentences.txt" OR
	    source="https://github.com/matbahasa/TALPCo/blob/master/data_jpn.txt"
	  ))
    `);
  },
  down: () => Promise.resolve(),
};
