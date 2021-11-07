"use strict";

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/43

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="nb-NO" AND source="https://tatoeba.org"
      )
    `);
  },
  down: () => Promise.resolve(),
};
