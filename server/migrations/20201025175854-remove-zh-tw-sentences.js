'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DELETE FROM Sentences
        WHERE localeId="zh-TW" AND sentence IN (
          "一元復始，雙喜臨門，四海遊龍，八方雲集",
          "人比人氣死人，蛋餅比蛋餅起司蛋餅",
          "天涯何處無芳草，一朵鮮花插在牛糞上嘛臭",
          "檢體維基百科",
          "跟對方用英語聊聊的",
          "這不只讓溝通更有效、更周延，",
          "鄧不利多，多不利鄧，鄧即是多，多即是鄧"
        )
    `); 
  },
  down: () => Promise.resolve(),
};
