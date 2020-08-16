'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    // We are not using a separate table for simplicity reason. It's unlikely we're ever would need that
    // given the structures of our queries we need to do. If somebody wants to do it, go for it!
    // For now, this takes a comma-separated list of language codes
    languages: DataTypes.STRING,
    useSwipeReview: DataTypes.BOOLEAN,
  }, {});

  return User;
};
