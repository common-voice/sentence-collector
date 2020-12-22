'use strict';

module.exports = {
  up: (queryInterface) => {
    return  queryInterface.sequelize.query(`
      UPDATE Sentences
        SET source="These are proverbs from volume 65 of 100-volume collection called 'Бабалар сөзі'. By article 8 of Kazakhstani copyright law, works of folklore are exempt from copyright and are thus in the public domain."
        WHERE (localeId="kk" AND source LIKE "These are proverbs from volume 65 of 100-volume collection called%")
    `);
  },
  down: () => Promise.resolve(),
};
