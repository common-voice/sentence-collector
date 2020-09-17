'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Votes', 'userId', Sequelize.STRING),
  down: (queryInterface) => queryInterface.removeColumn('Votes', 'userId'),
};
