'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="uk" AND source="cetation of Володимир Білінський")
    `);

    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="uk" AND source="cetation of Іван Білик")
    `);
  },
  down: () => Promise.resolve(),
};
