'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="ast" AND sentence IN (
        "Consta d'una sola nave rematada nuna capilla cuadrada.",
        "Esta atención hospitalaria surde de forma mui temparana en Siero.",
        "Les fiestes del l.lugar de Payares fáense a finales de agostu.",
        "Tá allugada énte la casa conceyu."
      )
    `);
  },
  down: () => Promise.resolve(),
};
