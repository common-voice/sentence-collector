'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    sentence: DataTypes.STRING,
    source: DataTypes.STRING,
    batch: DataTypes.STRING,
    userId: DataTypes.STRING,
    localeId: DataTypes.STRING,
  }, {});

  Sentence.associate = (models) => {
    Sentence.hasMany(models.Vote, { as: 'Vote', foreignKey: 'sentenceId' });
    Sentence.hasOne(models.User, { as: 'User', foreignKey: 'id' });
  };

  return Sentence;
};
