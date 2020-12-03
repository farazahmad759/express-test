'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Tags',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        __tttLevel: {
          type: Sequelize.INTEGER,
        },
        __tttFormat: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        __shortcode: {
          type: Sequelize.STRING,
        },
        __parentId: {
          type: Sequelize.INTEGER,
        },
        __orderInParent: {
          type: Sequelize.INTEGER,
        },
        __hierarchyLevel: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
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
        // __grade: {
        //   type: Sequelize.VIRTUAL,
        //   allowNull:false,
        //   get () {
        //   return this.getDataValue('title') + ' ' + this.getDataValue('title')
        //   }
        // }
      },
      {
        hierarchy: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tags');
  },
};
