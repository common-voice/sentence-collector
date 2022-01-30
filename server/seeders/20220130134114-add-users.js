'use strict';

module.exports = {
  up: async (queryInterface) => {
    const users = [{
      email: 'one@example.com',
      languages: 'en,de,fr',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'two@example.com',
      languages: 'en',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'three@example.com',
      languages: 'fr',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
