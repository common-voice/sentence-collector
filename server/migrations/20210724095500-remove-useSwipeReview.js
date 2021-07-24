'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn(
      'Users',
      'useSwipeReview',
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'useSwipeReview',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    );
  },
};
