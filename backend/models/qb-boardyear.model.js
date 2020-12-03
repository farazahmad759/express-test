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
  class QbBoardyear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // self
      QbBoardyear.belongsTo(models.QbBoardyear, {
        as: 'assoc_parent',
        foreignKey: '_parent_id',
      });
      QbBoardyear.hasMany(models.QbBoardyear, {
        as: 'assoc_children',
        foreignKey: '_parent_id',
      });

      // simple belongsTo
      QbBoardyear.belongsTo(models.QbSyllabus, {
        as: 'assoc_syllabus',
        foreignKey: '_syllabus_id',
      });

      // M:N associations
      QbBoardyear.belongsToMany(models.QbQuestion, {
        as: 'assoc_questions',
        foreignKey: '_boardyear_id',
        otherKey: '_question_id',
        through: 'qb_assoc_boardyears_questions',
      });
      QbBoardyear.belongsToMany(models.QbPrintable, {
        as: 'assoc_printables',
        foreignKey: '_boardyear_id',
        otherKey: '_printable_id',
        through: 'qb_assoc_boardyears_printables',
      });
    }
  }
  QbBoardyear.init(
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
      ...common_end_fields.model,
      // virtual fields
    },
    {
      sequelize,
      modelName: 'qb_boardyears',
      paranoid: true,
      createdAt: '_created_at',
      updatedAt: '_updated_at',
      deletedAt: '_deleted_at',
    }
  );
  return QbBoardyear;
};
