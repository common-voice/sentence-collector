'use strict';

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/40
// The list provided in the Discourse thread matches the list of current sources
// for WikiSource, therefore we can delete all of them instead of using the full list

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="tr" AND source LIKE "https://tr.wikisource.org/%"
      )
    `);
  },
  down: () => Promise.resolve(),
};
