'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    sentence: DataTypes.STRING,
    user: DataTypes.STRING,
    source: DataTypes.STRING,
    batch: DataTypes.STRING,
    localeId: DataTypes.INTEGER,
  }, {});

  Sentence.associate = (models) => {
    Sentence.belongsTo(models.Locale, { as: 'Locale', foreignKey: 'localeId' });
    Sentence.hasMany(models.Vote, { as: 'Vote', foreignKey: 'sentenceId' });
  };

  return Sentence;
};
