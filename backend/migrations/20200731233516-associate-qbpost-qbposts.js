'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('__QbPost_QbPosts', {
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
      qbpostId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      ancestorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },{
      charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('__QbPost_QbPosts');
  },
};
