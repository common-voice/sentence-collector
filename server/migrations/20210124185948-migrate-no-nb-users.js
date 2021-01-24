'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'no', '') WHERE languages='no'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'no,', '') WHERE languages LIKE 'no,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',no,', ',') WHERE languages LIKE '%,no,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',no', '') WHERE languages LIKE '%,no'");

    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'nb', 'nb-NO') WHERE languages='nb'");

    // if user already has nb-NO as well, we only want to remove "nb"
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'nb,', '') WHERE languages LIKE 'nb,%' AND languages LIKE '%nb-NO%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',nb,', ',') WHERE languages LIKE '%,nb,%' AND languages LIKE '%nb-NO%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',nb', '') WHERE languages LIKE '%,nb' AND languages LIKE '%nb-NO%'");

    // if we still have "nb" here, the user doesn't already have nb-NO, so we can simply replace it
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, 'nb,', 'nb-NO,') WHERE languages LIKE 'nb,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',nb,', ',nb-NO,') WHERE languages LIKE '%,nb,%'");
    await queryInterface.sequelize.query("UPDATE Users SET languages = REPLACE(languages, ',nb', ',nb-NO') WHERE languages LIKE '%,nb'");
  },
  down: () => Promise.resolve(),
};
