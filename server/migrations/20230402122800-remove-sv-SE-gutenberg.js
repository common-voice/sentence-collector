'use strict';

// https://discourse.mozilla.org/t/high-amount-of-low-quality-submissions-in-sentence-collector-makes-reviewing-boring/108368/8

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId = "sv-SE" AND batch = "30cb0726-3e9d-480c-8faf-ef79585ae782"
    `);
  },
  down: () => Promise.resolve(),
};
