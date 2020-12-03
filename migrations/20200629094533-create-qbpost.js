'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'QbPosts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        type: {
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        content: {
          type: Sequelize.JSON,
          // allowNull: false,
        },
        category1: {
          type: Sequelize.INTEGER,
        },
        category2: {
          type: Sequelize.INTEGER,
        },
        category3: {
          type: Sequelize.INTEGER,
        },
        category4: {
          type: Sequelize.INTEGER,
        },
        difficulty: {
          type: Sequelize.INTEGER,
        },
        __parentId: {
          type: Sequelize.INTEGER,
        },
        __relevantId: {
          type: Sequelize.INTEGER,
        },
        __orderInParent: {
          type: Sequelize.INTEGER,
        },
        __hierarchyLevel: {
          type: Sequelize.INTEGER,
        },
        __misc: {
          type: Sequelize.JSON,
        },
        __raw: {
          type: Sequelize.JSON,
        },
        __type: {
          type: Sequelize.STRING,
        },
        __status: {
          type: Sequelize.STRING,
          defaultValue: 'enabled',
        },
        __visibility: {
          type: Sequelize.STRING,
          defaultValue: 'public',
        },
        __createdBy: {
          type: Sequelize.UUID,
        },
        __lang: {
          type: Sequelize.STRING,
          defaultValue: 'en',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QbPosts');
  },
};
