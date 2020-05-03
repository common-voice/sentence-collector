'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user: DataTypes.STRING,
    approval: DataTypes.BOOLEAN,
  }, {});

  Vote.associate = (models) => {
    Vote.belongsTo(models.Sentence);
  };

  return Vote;
};
