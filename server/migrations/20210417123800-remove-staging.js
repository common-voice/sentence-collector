'use strict';

// This is solely for an initial deployment to staging and will be reverted!!!!

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('DELETE FROM Sentences');
    await queryInterface.sequelize.query('DELETE FROM Votes');
  },
  down: () => Promise.resolve(),
};
