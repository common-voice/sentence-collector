'use strict';

module.exports = {
  up: async (queryInterface) => {
    for (let i = 0; i < 500_000; i++) {
      // Full Approvals
      if (i < 200_000) {
        const votes = [{
          userId: 'one@example.com',
          approval: true,
          sentenceId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          userId: 'two@example.com',
          approval: true,
          sentenceId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }];

        await queryInterface.bulkInsert('Votes', votes, {});
        continue;
      }

      // Approvals
      if (i < 400_000) {
        const votes = [{
          userId: 'one@example.com',
          approval: true,
          sentenceId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }];

        await queryInterface.bulkInsert('Votes', votes, {});
        continue;
      }

      // Rejections
      if (i < 450_000) {
        const votes = [{
          userId: 'one@example.com',
          approval: false,
          sentenceId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          userId: 'three@example.com',
          approval: false,
          sentenceId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }];

        await queryInterface.bulkInsert('Votes', votes, {});
        continue;
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Votes', null, {});
  }
};
