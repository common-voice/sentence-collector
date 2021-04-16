'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      WITH IDsToDelete AS (SELECT
          Sentences.id,
          Sentences.sentence
        FROM Sentences
        LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
        WHERE Sentences.localeId = "th"
          AND Sentences.sentence REGEXP '[A-Za-z0-9๐-๙ๆฯ]'
        GROUP BY Sentences.id
        HAVING
          COUNT(Votes.approval) < 2 OR
          COUNT(Votes.approval) = 2 AND SUM(Votes.approval) = 1
      )
      DELETE FROM Sentences WHERE id IN (SELECT id FROM IDsToDelete);
    `);
  },
  down: () => Promise.resolve(),
};
