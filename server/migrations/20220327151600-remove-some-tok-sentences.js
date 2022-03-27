'use strict';

// https://github.com/common-voice/sentence-collector/pull/610#issuecomment-1079935318

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="tok" AND sentence IN (
        "jan lilii o tawa supa lape.",
        "jan Timi li sona ala e sona pi pali ni.",
        "jan Timi li wile ala lon jan pi kulupu ni.",
        "mi ken ala pali tawa pona nim",
        "mi tawa ma Sanai.",
        "ona li jo e nimi mute pi toki Inl",
        "sike pan pi ma Italia li kama ala lon insa mi.",
        "sina sutopatikuna.",
        "tenpo mute la jan Timi li ante e tomo ona.",
        "tenpo pini la jan Sonja li yupekosi lili.",
        "toki ni la mi yupekosi e kulupu ni pi toki kalama, a a a!",
        "ale li pona. tan same a la mi pilin monsuta?",
        "jan lawa li lona poka mi.",
        "kupupu musi ni li pakala e tomo sina.",
        "ma seli la ko lejo li tawa sama kiwen telo lete.",
        "mi sone e ni: tomo sina li lon nasin seme.",
        "ona mute li loki e ni: mi toki mute.",
        "tenpo ni la mi lukine ijo sin pi pakala mute."
      )
    `);
  },
  down: () => Promise.resolve(),
};
