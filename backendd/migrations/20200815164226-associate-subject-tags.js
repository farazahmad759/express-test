'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('__Subject_Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      tagId: {
        type: Sequelize.INTEGER,
        primaryKey: true,        
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      }      
    },{
      charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
