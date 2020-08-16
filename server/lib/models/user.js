'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    useSwipeReview: DataTypes.BOOLEAN,
  }, {});

  return User;
};
