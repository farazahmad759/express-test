'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'QbPosts',
      [
        {
          content: '{"title": "Exam 1"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__exam',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '{"title": "Exam 2"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__exam',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: `{"title": "Passage for Question 1"}`,
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__passage',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: `{
            "__statements": {
                "__en": "Which of the following is a vector?",
                "__ur": "ان میں سے کونسا ویکٹر ہے؟"
            },
            "__choices": [
                {
                    "__en": "Force",
                    "__ur": "فورس",
                    "__is_correct": true,
                    "__comment_en": "",
                    "__comment_ur": ""
                },
                {
                    "__en": "Time",
                    "__ur": "ٹائم",
                    "__is_correct": false,
                    "__comment_en": "",
                    "__comment_ur": ""
                },
                {
                    "__en": "Mass",
                    "__ur": "ماس",
                    "__is_correct": false,
                    "__comment_en": "",
                    "__comment_ur": ""
                },
                {
                    "__en": "Temperature",
                    "__ur": "ٹمپریچر",
                    "__is_correct": false,
                    "__comment_en": "",
                    "__comment_ur": ""
                }
            ],
            "__answers": {
              "__en": "",
              "__ur": ""
            }
        }`,
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__question',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '{"title": "Question 2"}',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          __type: '__question',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QbPosts', null, {});
  },
};
