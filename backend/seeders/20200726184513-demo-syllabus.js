'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'Punjab Textbook Board 2002',
          __shortcode: 'PCTB-2002',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__syllabus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'UHS 2019',
          __shortcode: 'UHS-2019',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__syllabus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 3
          title: 'UHS 2020',
          __shortcode: 'UHS-2020',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__syllabus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 4
          title: 'NUMS 2019',
          __shortcode: 'NUMS-2019',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__syllabus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 5
          title: 'NUMS 2020',
          __shortcode: 'NUMS-2020',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__syllabus',
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
