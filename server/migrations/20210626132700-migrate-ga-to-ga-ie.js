'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="ga-IE"
        WHERE localeId="ga"
    `);
  },
  down: () => Promise.resolve(),
};
