'use strict';

module.exports = {
  up: async (queryInterface) => {
    return  queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="sv" AND source LIKE "%tatoeba.org%")
    `);
  },
  down: () => Promise.resolve(),
};
