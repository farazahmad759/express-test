'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      qbposts: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.STRING,
      },
      author_phone: {
        type: Sequelize.STRING,
      },
      author_info: {
        type: Sequelize.TEXT,
      },
      author_youtube: {
        type: Sequelize.STRING,
      },
      author_facebook: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      _grade: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      _subject: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      _tags: {
        type: Sequelize.STRING,
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
    },{
      charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exams');
  },
};
