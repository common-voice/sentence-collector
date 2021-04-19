'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="uk" AND (source="Шкляр В. Залишенець (Чорний Ворон)"))
    `);
  },
  down: () => Promise.resolve(),
};
