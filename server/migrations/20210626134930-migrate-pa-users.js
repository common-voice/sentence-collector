'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'pa', 'pa-IN') WHERE languages='pa'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'pa,', 'pa-IN,') WHERE languages LIKE 'pa,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',pa,', ',pa-IN,') WHERE languages LIKE '%,pa,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',pa', ',pa-IN') WHERE languages LIKE '%,pa'");
  },
  down: () => Promise.resolve(),
};
