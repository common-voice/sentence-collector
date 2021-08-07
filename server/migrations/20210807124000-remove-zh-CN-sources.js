'use strict';

// https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767/30

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="zh-CN" AND
          (
            source="https://zh.wikisource.org/wiki/%E5%9B%BD%E5%AE%B6%E7%9B%91%E5%A7%94%E8%B0%83%E6%9F%A5%E7%BB%84%E8%B4%9F%E8%B4%A3%E4%BA%BA%E7%AD%94%E8%AE%B0%E8%80%85%E9%97%AE"
            OR
            source="《毛泽东选集》"
          )
      )
    `);
  },
  down: () => Promise.resolve(),
};
