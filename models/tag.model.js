'use strict';
const { Model } = require('sequelize');
const getFormattedTopicNumber = require('../functions/getFormattedTopicNumber.js');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.QbPost, {
        as: 'tag_qbposts',
        foreignKey: 'tagId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'question_type_qbposts',
        foreignKey: 'question_typeId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'grade_qbposts',
        foreignKey: 'gradeId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'subject_qbposts',
        foreignKey: 'subjectId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'topic_qbposts',
        foreignKey: 'topicId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'boardyear_qbposts',
        foreignKey: 'boardyearId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'exercise_qbposts',
        foreignKey: 'exerciseId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsToMany(models.QbPost, {
        as: 'syllabus_qbposts',
        foreignKey: 'syllabusId',
        otherKey: 'qbpostId',
        through: '__QbPost_Tags',
      });
      Tag.belongsTo(Tag, { as: 'parent', foreignKey: '__parentId' });
      Tag.hasMany(Tag, { as: 'children', foreignKey: '__parentId' });
      Tag.belongsToMany(Tag, {
        as: 'descendents',
        foreignKey: 'ancestorId',
        otherKey: 'tagId',
        through: '__Tag_Tags',
      });
      Tag.belongsToMany(Tag, {
        as: 'ancestors',
        foreignKey: 'tagId',
        otherKey: 'ancestorId',
        through: '__Tag_Tags',
      });
      Tag.belongsToMany(Tag, {
        as: 'grades',
        foreignKey: 'tagId',
        otherKey: 'gradeId',
        through: '__Tag_Tags',
      });
      Tag.belongsToMany(Tag, {
        as: 'subjects',
        foreignKey: 'tagId',
        otherKey: 'subjectId',
        through: '__Tag_Tags',
      });
      Tag.belongsToMany(Tag, {
        as: 'syllabuses',
        foreignKey: 'tagId',
        otherKey: 'syllabusId',
        through: '__Tag_Tags',
      });
      // Tag.belongsToMany(Tag, {
      //   as: 'subjects',
      //   foreignKey: 'tagId',
      //   through: '__subject_Tags',
      // });
      // Tag.belongsToMany(Tag, {
      //   as: 'subjectTags',
      //   foreignKey: 'subjectId',
      //   through: '__subject_Tags',
      // });
    }
  }
  Tag.init(
    {
      __tttLevel: {
        type: DataTypes.INTEGER,
      },
      __tttFormat: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('__tttFormat');
          // strings = [
          //   "1 - Measurements",
          //   "1.1 - Introduction to Physics",
          //   "01.1 - Introduction to Physics",
          //   "01.02 - Physical Quantities",
          //   "01.02.1 - Physical Quantities",
          //   "1. wrong",
          //   "1.-right"
          // ];
          // let re1 = /^(\d*.)*\s*-\s*/;
          // strings.forEach(item=>{
          //     let found = re1.test(item);
          //     console.log(found + " " + item);
          //     if(found) {
          //         console.log(item.match(re1)[0]);
          //     }
          // })
          let _ret = rawValue;
          // let re = /^(\d*.)*\s*-\s*/;
          // let found  = re.test(rawValue);
          // if(found) {
          //   _ret = rawValue.match(re)[0];
          // }
          return _ret;
        },
      },
      title: {
        type: DataTypes.STRING,
        set: function (value) {
          this.setDataValue('title', value);
          let {
            topicLevel,
            topicFormat,
          } = getFormattedTopicNumber.getFormattedTopicNumber(value);
          this.setDataValue('__tttLevel', topicLevel);
          this.setDataValue('__tttFormat', topicFormat);
        },
      },
      description: DataTypes.TEXT,
      __shortcode: DataTypes.STRING,
      __parentId: DataTypes.INTEGER,
      __orderInParent: DataTypes.INTEGER,
      __hierarchyLevel: DataTypes.INTEGER,
      __misc: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('__misc');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('__misc', {});
          }
          return this.setDataValue('__misc', value);
        },
      },
      __raw: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('__raw');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('__raw', {});
          }
          return this.setDataValue('__raw', value);
        },
      },
      __type: DataTypes.STRING,
      __status: DataTypes.STRING,
      __visibility: DataTypes.STRING,
      __createdBy: DataTypes.UUID,
      __lang: DataTypes.STRING,

      // virtual fields
      __ancestorsArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('ancestors');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __descendentsArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('descendents');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __gradesArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('grades');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __subjectsArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('subjects');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __syllabusesArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('syllabuses');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      paranoid: true,
    }
  );
  return Tag;
};
