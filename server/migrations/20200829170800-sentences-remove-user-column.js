'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('Sentences', 'user'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Sentences', 'user', Sequelize.STRING),
};
