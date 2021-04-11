'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="uk" AND (source="https://github.com/brown-uk/" OR source="https://github.com/brown-uk/dict_uk/releases"))
    `);
  },
  down: () => Promise.resolve(),
};
