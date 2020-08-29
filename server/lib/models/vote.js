'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.STRING,
    approval: DataTypes.BOOLEAN,
  }, {});

  Vote.associate = (models) => {
    Vote.belongsTo(models.Sentence);
    Vote.hasOne(models.User, { as: 'User', foreignKey: 'id' });
  };

  return Vote;
};
