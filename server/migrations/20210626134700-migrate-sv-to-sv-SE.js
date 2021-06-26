'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="sv-SE"
        WHERE localeId="sv"
    `);
  },
  down: () => Promise.resolve(),
};
