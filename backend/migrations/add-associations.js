module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Tags', // name of Source model
      '__parentId', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      '__parentId', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'QbPosts', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      '__relevantId', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'QbPosts', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      'type', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      'category1', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      'category2', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      'category3', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'QbPosts', // name of Source model
      'category4', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    return queryInterface;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Tags', // name of Source model
      '__parentId' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      '__parentId' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      '__relevantId' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      'type' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      'category1' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      'category2' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      'category3' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'QbPosts', // name of Source model
      'category4' // name of the key in Source model
    );
    return queryInterface;
  },
};
