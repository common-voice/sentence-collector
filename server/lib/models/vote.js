'use strict';

const Sentence = require('./sentence');

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user: DataTypes.STRING,
    approval: DataTypes.BOOLEAN,
  }, {});

  const SentenceModel = Sentence(sequelize, DataTypes);
  Vote.belongsTo(SentenceModel, { foreignKey: 'sentenceId' });

  return Vote;
};
