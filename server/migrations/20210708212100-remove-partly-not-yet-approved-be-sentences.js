'use strict';

// Delete sentences from two authors if not approved, as
// bulk uploads covered them and has better quality.
// https://discourse.mozilla.org/t/sentence-collection-for-belarusian-request-for-advice/82150/14

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      WITH IDsToDelete AS (SELECT
          Sentences.id
        FROM Sentences
        LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
        WHERE Sentences.localeId = "be"
        GROUP BY Sentences.id
        HAVING
          COUNT(Votes.approval) < 2 OR
          COUNT(Votes.approval) = 2 AND SUM(Votes.approval) = 1
      )
      DELETE FROM Sentences WHERE id IN (SELECT id FROM IDsToDelete)
        AND (source LIKE "%Максім Гарэцкі" OR source LIKE "%Кузьма Чорны");
    `);
  },
  down: () => Promise.resolve(),
};
