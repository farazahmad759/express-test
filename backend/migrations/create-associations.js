module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'qb_syllabuses', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_syllabuses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_boardyears', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_boardyears', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_boardyears', // name of Source model
      '_syllabus_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_syllabuses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_grades', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_grades', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_subjects', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_subjects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_topics', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_topics', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_topics', // name of Source model
      '_syllabus_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_syllabuses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_topics', // name of Source model
      '_grade_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_grades', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_topics', // name of Source model
      '_subject_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_subjects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questiontypes', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_questiontypes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questiontypes', // name of Source model
      '_syllabus_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_syllabuses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questiontypes', // name of Source model
      '_grade_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_grades', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questiontypes', // name of Source model
      '_subject_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_subjects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_tags', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questions', // name of Source model
      '_parent_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_questions', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questions', // name of Source model
      '_grade_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_grades', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questions', // name of Source model
      '_subject_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_subjects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questions', // name of Source model
      '_questiontype_ind_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_questiontypes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.changeColumn(
      'qb_questions', // name of Source model
      '_questiontype_dep_id', // name of the key in Source model
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'qb_questiontypes', // name of Target model
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
      'qb_syllabuses', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_boardyears', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_boardyears', // name of Source model
      '_syllabus_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_grades', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_subjects', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_topics', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_topics', // name of Source model
      '_syllabus_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_topics', // name of Source model
      '_grade_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_topics', // name of Source model
      '_subject_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questiontypes', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questiontypes', // name of Source model
      '_syllabus_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questiontypes', // name of Source model
      '_grade_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questiontypes', // name of Source model
      '_subject_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_parent_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_syllabus_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_grade_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_subject_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_questiontype_ind_id' // name of the key in Source model
    );
    await queryInterface.removeColumn(
      'qb_questions', // name of Source model
      '_questiontype_dep_id' // name of the key in Source model
    );
    return queryInterface;
  },
};
