'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="ast" AND sentence IN (
        "Accedi fácilmente a los sitios que más visites.",
        "El fallu del xuráu daráse a conocer nel plazu d’un mes.",
        "El sol de marzu, fiere como un mazu.",
        "Esistió una llinia de fortificaciones de los milicianos en L’Altu Ventana y Agüeria.",
        "Hasta’l momentu asoleyamos los informes que van darréu.",
        "La llingua va camudar namás que se reanicie l'aplicación..",
        "La presencia del asturianu n’internet ye clave pal futuru del idioma.",
        "Nun roblaron la «Declaración de los Derechos del Home».",
        "Reclamar un estatus xurídicu d’oficialidá pal asturianu dientro de los organismos europeos.",
        "Representaba’l poder episcopal na zona la familia Bernaldo de Quirós."
      )
    `);
  },
  down: () => Promise.resolve(),
};
