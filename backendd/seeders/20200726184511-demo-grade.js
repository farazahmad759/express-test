'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'Grade 09',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__grade',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'Grade 10',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__grade',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 3
          title: 'Grade 11',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__grade',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 4
          title: 'Grade 12',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__grade',
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
