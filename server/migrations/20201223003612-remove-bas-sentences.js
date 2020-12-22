'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="bas" AND sentence IN (
        "éy! me bak le me kwo i lép.",
        "ñemb a ññwéha i ndap mok.",
        "ñkokon a mmal.",
        "ñkum u ñkôs ndoñ, ñkum u nlôôs ndoñ.",
        "ñkônôk u hibee mañga.",
        "ñkônôk u ñgand.",
        "ñkôô lipidô."
      )
    `);
  },
  down: () => Promise.resolve(),
};
