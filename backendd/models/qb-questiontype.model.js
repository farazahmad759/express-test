'use strict';
const { Model } = require('sequelize');
const getFormattedTopicNumber = require('../functions/getFormattedTopicNumber.js');
const common_migration_fields = require('../functions/common-database-fields');

module.exports = (sequelize, DataTypes) => {
  let common_end_fields = common_migration_fields.common_end_fields(
    null,
    null,
    sequelize,
    DataTypes
  );
  class QbQuestionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // self
      QbQuestionType.belongsTo(models.QbQuestionType, {
        as: 'assoc_parent',
        foreignKey: '_parent_id',
      });
      QbQuestionType.hasMany(models.QbQuestionType, {
        as: 'assoc_children',
        foreignKey: '_parent_id',
      });

      // simple belongsTo
      QbQuestionType.belongsTo(models.QbSyllabus, {
        as: 'assoc_syllabus',
        foreignKey: '_syllabus_id',
      });
      QbQuestionType.belongsTo(models.QbGrade, {
        as: 'assoc_grade',
        foreignKey: '_grade_id',
      });
      QbQuestionType.belongsTo(models.QbSubject, {
        as: 'assoc_subject',
        foreignKey: '_subject_id',
      });

      // simple hasMany
      QbQuestionType.hasMany(models.QbQuestion, {
        as: 'assoc_questions_ind',
        foreignKey: '_questiontype_ind_id',
      });
      QbQuestionType.hasMany(models.QbQuestion, {
        as: 'assoc_questions_dep',
        foreignKey: '_questiontype_dep_id',
      });

      // M:N associations
      QbQuestionType.belongsToMany(models.QbPrintable, {
        as: 'assoc_printables',
        foreignKey: '_questiontype_id',
        otherKey: '_printable_id',
        through: 'qb_assoc_printables_questiontypes',
      });
    }
  }
  QbQuestionType.init(
    {
      _title: {
        type: DataTypes.STRING,
        set: function (value) {
          this.setDataValue('_title', value);
          let {
            topicLevel,
            topicFormat,
          } = getFormattedTopicNumber.getFormattedTopicNumber(value);
          this.setDataValue('_tree_level', topicLevel);
          this.setDataValue('_tree_format', topicFormat);
        },
      },
      _sub_title: {
        type: DataTypes.STRING,
      },
      _description: DataTypes.TEXT,
      _content: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('_content');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('_content', {});
          }
          return this.setDataValue('_content', value);
        },
      },
      _syllabus_id: {
        type: DataTypes.INTEGER,
      },
      _grade_id: {
        type: DataTypes.INTEGER,
      },
      _subject_id: {
        type: DataTypes.INTEGER,
      },
      ...common_end_fields.model,
      // virtual fields
    },
    {
      sequelize,
      modelName: 'qb_questiontypes',
      paranoid: true,
      createdAt: '_created_at',
      updatedAt: '_updated_at',
      deletedAt: '_deleted_at',
    }
  );
  return QbQuestionType;
};
