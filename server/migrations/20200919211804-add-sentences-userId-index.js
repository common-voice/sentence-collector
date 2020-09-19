'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addIndex(
    'Sentences',
    ['userId'],
    {
      indexName: 'SentencesUserIdIndex',
      indicesType: 'FULLTEXT',
    }
  ),
  down: (queryInterface) => queryInterface.removeIndex('Sentences', 'SentencesUserIdIndex'),
};
