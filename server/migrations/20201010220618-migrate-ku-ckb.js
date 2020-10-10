'use strict';

module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE Sentences SET localeId = 'ckb' WHERE localeId = 'ku'"),
      queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'ku', 'ckb') WHERE languages LIKE '%ku%'"), // we're lucky as no other language includes "ku"
    ]);
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE Sentences SET localeId = 'ku' WHERE localeId = 'ckb'"),
      queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'ckb', 'ku') WHERE languages LIKE '%ckb%'"),
    ]);
  },
};
