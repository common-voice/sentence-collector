'use strict';

const Locale = require('./locale');

module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    sentence: DataTypes.STRING,
    user: DataTypes.STRING,
    source: DataTypes.STRING,
    localeId: DataTypes.INTEGER,
  }, {});

  const LocaleModel = Locale(sequelize, DataTypes);
  Sentence.belongsTo(LocaleModel, { foreignKey: 'localeId' });

  return Sentence;
};
