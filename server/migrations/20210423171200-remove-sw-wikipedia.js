'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="sw" AND source="Wikipedia Public Domain Dump files")
    `);
  },
  down: () => Promise.resolve(),
};
