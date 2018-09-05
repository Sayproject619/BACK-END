'use strict';
module.exports = (sequelize, DataTypes) => {
  var rel_profile_permission = sequelize.define('rel_profile_permission', {
    profile: DataTypes.INTEGER,
    permission: DataTypes.INTEGER
  }, {});
  rel_profile_permission.associate = function(models) {
    // associations can be defined here
  };
  return rel_profile_permission;
};