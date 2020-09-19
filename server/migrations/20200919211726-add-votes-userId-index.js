'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.addIndex(
    'Votes',
    ['userId'],
    {
      indexName: 'VotesUserIdIndex',
      indicesType: 'FULLTEXT',
    }
  ),
  down: (queryInterface) => queryInterface.removeIndex('Votes', 'VotesUserIdIndex'),
};
