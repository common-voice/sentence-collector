'use strict';

module.exports = {
  up: async (queryInterface) => {
    // The localeId on the Sentences table already seems to exist on staging and production, so
    // we need to make sure we do not add a duplicate index. Therefore we remove the index
    // if it exists and then re-add it.
    const indexes = await queryInterface.showIndex('Sentences');
    const localeIdIndex = indexes.find((index) => index.name === 'sentences_locale_id');
    if (localeIdIndex) {
      await queryInterface.removeIndex('Sentences', 'sentences_locale_id');
    }

    await queryInterface.addIndex(
      'Sentences',
      ['localeId'],
      {
        indexName: 'sentences_locale_id',
        indicesType: 'FULLTEXT',
      }
    );
  },
  down: (queryInterface) => queryInterface.removeIndex('Sentences', 'sentences_locale_id'),
};
