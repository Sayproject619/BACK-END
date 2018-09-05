'use strict';
// sequelize model:create --attributes "email:string name:string surname:string password:string profile:integer" --name User
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};