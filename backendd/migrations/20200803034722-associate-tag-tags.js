'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('__Tag_Tags', {
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
        // defaultValue: 0,
      },
      ancestorId: {
        type: Sequelize.INTEGER,
        // defaultValue: 0,
      },
      gradeId: {
        type: Sequelize.INTEGER,
        // defaultValue: 0,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        // defaultValue: 0,
      },
      syllabusId: {
        type: Sequelize.INTEGER,
        // defaultValue: 0,
      },
    },{
      charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('__Tag_Tags');
  },
};
