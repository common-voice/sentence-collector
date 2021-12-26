'use strict';

// https://github.com/common-voice/common-voice/issues/3392

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="yue"
    `);
  },
  down: () => Promise.resolve(),
};
