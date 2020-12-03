'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Exams',
      [
        {
          title: 'Exam 1',
          qbposts:
            '[{"statement":"<p>Question1</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"qkuxzg"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"hvzrvw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"btxdey"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"cmmkym"}],"order_in_exam":0,"randKey":"vqiyuu"},{"statement":"<p>Question2</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"tgfplw"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"ggjlbw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"qvdgyc"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"puerv"}],"order_in_exam":0,"randKey":"lfwrlw"}]',
          _grade: 'Grade 09',
          _subject: 'Physics',
          _tags: 'Electronics, Thermodynamics',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Exam 2',
          qbposts:
            '[{"statement":"<p>Question1</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"qkuxzg"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"hvzrvw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"btxdey"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"cmmkym"}],"order_in_exam":0,"randKey":"vqiyuu"},{"statement":"<p>Question2</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"tgfplw"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"ggjlbw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"qvdgyc"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"puerv"}],"order_in_exam":0,"randKey":"lfwrlw"}]',
          _grade: 'Grade 10',
          _subject: 'Physics',
          _tags: 'Electronics, Thermodynamics',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Exam 3',
          qbposts:
            '[{"statement":"<p>Question1</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"qkuxzg"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"hvzrvw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"btxdey"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"cmmkym"}],"order_in_exam":0,"randKey":"vqiyuu"},{"statement":"<p>Question2</p>","qfields":[{"statement":"<p>option1</p>","is_correct":"false","randKey":"tgfplw"},{"statement":"<p>option2</p>","is_correct":false,"randKey":"ggjlbw"},{"statement":"<p>option3</p>","is_correct":false,"randKey":"qvdgyc"},{"statement":"<p>option4</p>","is_correct":false,"randKey":"puerv"}],"order_in_exam":0,"randKey":"lfwrlw"}]',
          _grade: 'Grade 10',
          _subject: 'Chemistry',
          _tags: 'Electronics, Thermodynamics',
          __createdBy: 'b2Pq2vt503a6dRSbxBoOKBB1m623',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Exams', null, {});
  },
};
