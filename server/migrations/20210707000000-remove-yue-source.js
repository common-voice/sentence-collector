'use strict';

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/28

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="yue" AND source LIKE "https://hkbus.fandom.com/wiki/%")
    `);
  },
  down: () => Promise.resolve(),
};
