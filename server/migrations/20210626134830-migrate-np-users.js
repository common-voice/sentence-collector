'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'ne', 'ne-NP') WHERE languages='ne'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'ne,', 'ne-NP,') WHERE languages LIKE 'ne,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',ne,', ',ne-NP,') WHERE languages LIKE '%,ne,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',ne', ',ne-NP') WHERE languages LIKE '%,ne'");
  },
  down: () => Promise.resolve(),
};
