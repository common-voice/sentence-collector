'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addIndex(
    'Votes',
    ['sentenceId'],
    {
      indexName: 'VotesSentenceIdIndex',
      indicesType: 'FULLTEXT',
    }
  ),
  down: (queryInterface) => queryInterface.removeIndex('Votes', 'VotesSentenceIdIndex'),
};
