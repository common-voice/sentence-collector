'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sentences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    sentence: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    source: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    localeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Sentences'),
};
