'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rel_profile_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile: {
        type: Sequelize.INTEGER
        /*,
        references: {
          model: 'profiles',
          key: 'id'
        }*/
      },
      permission: {
        type: Sequelize.INTEGER
       /*,
        references: {
          model: 'permissions',
          key: 'id'
        }*/
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rel_profile_permissions');
  }
};