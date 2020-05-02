'use strict';

module.exports = (sequelize, DataTypes) => {
  const Locale = sequelize.define('Locale', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    nativeName: DataTypes.STRING,
  }, {});

  return Locale;
};