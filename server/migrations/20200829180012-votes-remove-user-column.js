'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('Votes', 'user'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Votes', 'user', Sequelize.STRING),
};
