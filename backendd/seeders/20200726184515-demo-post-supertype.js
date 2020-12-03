'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'Multiple Choice Question',
          __misc: '{"for_qbposts__type": "__question"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__post_supertype',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'Synonyms',
          __misc: '{"for_qbposts__type": "__question"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__post_supertype',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 3
          title: 'Application',
          __misc: '{"for_qbposts__type": "__question"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__post_supertype',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 4
          title: 'Article',
          __misc: '{"for_qbposts__type": "__article"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__post_supertype',
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
