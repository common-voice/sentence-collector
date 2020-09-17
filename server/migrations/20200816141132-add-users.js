'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      unique: 'uniqueEmail',
      type: Sequelize.STRING,
    },
    languages: {
      allowNull: false,
      defaultValue: '',
      type: Sequelize.STRING,
    },
    useSwipeReview: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
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
      uniqueEmail: {
          fields: ['email'],
      },
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
