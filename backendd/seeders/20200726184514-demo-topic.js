'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          // 1
          title: 'Measurements',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__topic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'Torque MDCAT',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__topic',
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
