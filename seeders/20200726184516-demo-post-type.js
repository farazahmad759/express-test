'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'MCQ',
          __shortcode: '__mcq',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __parentId: 12,
          __type: '__post_type',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
