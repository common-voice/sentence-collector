'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Sentences', 'userId', Sequelize.STRING),
  down: (queryInterface) => queryInterface.removeColumn('Sentences', 'userId'),
};
