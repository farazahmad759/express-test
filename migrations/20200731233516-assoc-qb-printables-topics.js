'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'qb_assoc_printables_topics',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        _printable_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        _topic_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        _created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        _updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        _deleted_at: {
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
    await queryInterface.dropTable('qb_assoc_printables_topics');
  },
};
