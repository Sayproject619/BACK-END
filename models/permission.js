'use strict';

module.exports = (sequelize, DataTypes) => {
  var permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    write : DataTypes.BOOLEAN,
    read : DataTypes.BOOLEAN
  }, {});
  permission.associate = function(models) {
    // associations can be defined here
  };
  return permission;
};