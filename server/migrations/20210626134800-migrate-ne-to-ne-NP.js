'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="ne-NP"
        WHERE localeId="ne"
    `);
  },
  down: () => Promise.resolve(),
};
