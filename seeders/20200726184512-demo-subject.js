'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'Physics',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'Chemistry',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 3
          title: 'Mathematics',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 4
          title: 'Biology',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 5
          title: 'English',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 6
          title: 'Islamic Studies',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 7
          title: 'Pak Studies',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 8
          title: 'Urdu',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 9
          title: 'Computer Science',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__subject',
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
