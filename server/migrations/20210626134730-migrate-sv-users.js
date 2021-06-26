'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'sv', 'sv-SE') WHERE languages='sv'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'sv,', 'sv-SE,') WHERE languages LIKE 'sv,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',sv,', ',sv-SE,') WHERE languages LIKE '%,sv,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',sv', ',sv-SE') WHERE languages LIKE '%,sv'");
  },
  down: () => Promise.resolve(),
};
