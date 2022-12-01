'use strict';

// https://github.com/common-voice/sentence-collector/issues/650

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences WHERE (
        localeId="tr" AND source="firmamız veri tabanından bu proje bizim için önemli Türkçe olarak 1500 saate yakın hedefimiz var personel mesai yapacak bunun için cümleler ekliyoruz."
      )
    `);
  },
  down: () => Promise.resolve(),
};
