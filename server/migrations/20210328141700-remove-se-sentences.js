'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE (localeId="sv" AND source="https://www.opensubtitles.org/sv/search/imdbid-118715/sublanguageid-swe/moviename-the%20big%20lebowski")
    `);
  },
  down: () => Promise.resolve(),
};
