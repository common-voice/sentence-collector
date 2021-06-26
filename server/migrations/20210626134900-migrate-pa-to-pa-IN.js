'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="pa-IN"
        WHERE localeId="pa"
    `);
  },
  down: () => Promise.resolve(),
};
