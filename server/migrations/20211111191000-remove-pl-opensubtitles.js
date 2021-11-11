"use strict";

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/46

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="pl" AND (
          source LIKE "%opensubtitles.org%" OR
          source="open subtitles" OR
          source="opensubtitles and project gutenberg"
        )
      )
    `);
  },
  down: () => Promise.resolve(),
};
