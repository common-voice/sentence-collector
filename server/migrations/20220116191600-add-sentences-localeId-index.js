'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addIndex(
    'Sentences',
    ['localeId'],
    {
      indexName: 'SentencesLocaleIdIndex',
      indicesType: 'FULLTEXT',
    }
  ),
  down: (queryInterface) => queryInterface.removeIndex('Sentences', 'SentencesLocaleIdIndex'),
};
