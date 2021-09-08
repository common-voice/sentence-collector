'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="nan-tw"
        WHERE localeId="nan-TW"
    `);
  },
  down: () => Promise.resolve(),
};
