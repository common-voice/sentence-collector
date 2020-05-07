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
      unique: true,
      type: Sequelize.STRING,
    },
    source: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    user: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    localeId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    batch: {
      type: Sequelize.STRING,
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
