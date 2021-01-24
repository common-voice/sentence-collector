'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET localeId="nb-NO"
        WHERE localeId="nb"
    `);
  },
  down: () => Promise.resolve(),
};
