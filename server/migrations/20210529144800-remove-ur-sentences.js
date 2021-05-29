'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="ur" AND source="https://github.com/Smat26/Roman-Urdu-Dataset/blob/master/Dataset/Roman%20Urdu%20DataSet.csv")
    `);
  },
  down: () => Promise.resolve(),
};
