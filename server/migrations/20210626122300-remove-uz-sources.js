'use strict';

// Part 2 - remove sentences by source
// https://github.com/common-voice/sentence-collector/issues/452

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE (localeId="uz" AND (source="ok" OR source="private"))
    `);
  },
  down: () => Promise.resolve(),
};
