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
      unique: 'uniqueSentence',
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
      unique: 'uniqueSentence',
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
  }, {
    uniqueKeys: {
      uniqueSentence: {
          fields: ['sentence', 'localeId'],
      },
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Sentences'),
};
