'use strict';

const languages = require('../lib/languages');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Locales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nativeName: {
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
    });

    const allLocales = languages.getAllLanguages();
    const enrichedLocales = allLocales.map((locale) => ({
      ...locale,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Locales', enrichedLocales);
  },
  down: (queryInterface) => queryInterface.dropTable('Locales'),
};
