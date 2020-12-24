'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addIndex(
    'Sentences',
    ['localeId'],
    {
      indexName: 'SentenceLocaleIndex',
      indicesType: 'FULLTEXT',
    }
  ),
  down: (queryInterface) => queryInterface.removeIndex('Sentences', 'SentenceLocaleIndex'),
};
