'use strict';
const common_migration_fields = require('../functions/common-database-fields');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let common_end_fields = await common_migration_fields.common_end_fields(
      queryInterface,
      Sequelize,
      null,
      null
    );
    await queryInterface.createTable(
      'qb_questiontypes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        _title: {
          type: Sequelize.STRING,
        },
        _sub_title: {
          type: Sequelize.STRING,
        },
        _description: {
          type: Sequelize.TEXT,
        },
        _content: {
          type: Sequelize.JSON,
        },
        _syllabus_id: {
          type: Sequelize.INTEGER,
        },
        _grade_id: {
          type: Sequelize.INTEGER,
        },
        _subject_id: {
          type: Sequelize.INTEGER,
        },
        ...common_end_fields.migration,
      },
      {
        hierarchy: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('qb_questiontypes');
  },
};
