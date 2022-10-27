"use strict";

// https://github.com/common-voice/sentence-collector/issues/641

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId = "oc"
    `);
  },
  down: () => Promise.resolve(),
};
