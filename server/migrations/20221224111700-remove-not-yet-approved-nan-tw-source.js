'use strict';

// https://github.com/common-voice/sentence-collector/issues/657

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      WITH IDsToDelete AS (SELECT
          Sentences.id
        FROM Sentences
        LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
        WHERE
          Sentences.localeId = "nan-tw" AND
          Sentences.source = "https://github.com/moztw/cc0-sentences/blob/7651b162ee5f39278a37992dbbd52a28f335580f/nan-TW/taioaan-dict.txt"
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
