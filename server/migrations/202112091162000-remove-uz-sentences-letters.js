'use strict';

// https://discourse.mozilla.org/t/sentence-collector-need-help-to-remove/88934

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="uz" AND id IN (
        10003901,
        10003737,
        10002855,
        10002372,
        10002410,
        10002509,
        10002687,
        10001561,
        10001625,
        10001729,
        10001730,
        10001731,
        10001734,
        10001741,
        10001742,
        9981639,
        9981533,
        9981251,
        9981275,
        9981464,
        9981140,
        9981154,
        9980556,
        9981040,
        9980303,
        9979842
      )
    `);
  },
  down: () => Promise.resolve(),
};
