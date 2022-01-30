'use strict';

const random = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let randomString = '';
  for (let i = 0; i < 14; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomString;
};

module.exports = {
  up: async (queryInterface) => {
    for (let i = 0; i < 2_000_000; i++) {
      const sentences = [];

      // We want the first user to have most added sentences
      if (i <= 1_500_000) {
        sentences.push({
          userId: 'one@example.com',
          sentence: `EN: ${random()}`,
          source: 'Foo',
          localeId: 'en',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (i % 2 === 0) {
          sentences.push({
            userId: 'one@example.com',
            sentence: `DE: ${random()}`,
            source: 'Foo',
            localeId: 'de',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        await queryInterface.bulkInsert('Sentences', sentences, {});
        continue;
      }

      // 500k sentences each for the other two users

      sentences.push({
        userId: 'two@example.com',
        sentence: `EN: ${random()}`,
        source: 'Foo',
        localeId: 'en',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      sentences.push({
        userId: 'three@example.com',
        sentence: `FR: ${random()}`,
        source: 'Foo',
        localeId: 'fr',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await queryInterface.bulkInsert('Sentences', sentences, {});
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Sentences', null, {});
  }
};
