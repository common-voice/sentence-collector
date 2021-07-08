'use strict';

// Delete sentences from two authors as
// bulk uploads covered them and has better quality.
// https://discourse.mozilla.org/t/sentence-collection-for-belarusian-request-for-advice/82150/14

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE
        localeId = "be" AND
        (
          source LIKE "%Максім Гарэцкі" OR
          source LIKE "%Кузьма Чорны"
        );
    `);
  },
  down: () => Promise.resolve(),
};
