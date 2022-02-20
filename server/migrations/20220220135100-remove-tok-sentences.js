'use strict';

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/51

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="tok" AND source="http://tokisoweli.blogspot.com/"
      )
    `);
  },
  down: () => Promise.resolve(),
};
