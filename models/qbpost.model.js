'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QbPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QbPost.belongsToMany(models.QbPost, {
        as: 'descendents',
        foreignKey: 'ancestorId',
        through: '__QbPost_QbPosts',
      });
      QbPost.belongsToMany(models.QbPost, {
        as: 'ancestors',
        foreignKey: 'qbpostId',
        through: '__QbPost_QbPosts',
      });
      // QbPost.belongsToMany(models.QbPost, {
      //   as: 'passage',
      //   through: '__QbPost_QbPosts',
      // });
      // QbPost.belongsToMany(models.Tag, {
      //   as: 'syllabus',
      //   // foreignKey: 'ancestorId',
      //   through: '__QbPost_Tags',
      // });
      // QbPost.belongsToMany(models.Tag, {
      //   as: 'boardyears',
      //   // foreignKey: 'boardyearId',
      //   through: '__QbPost_Tags',
      // });
      QbPost.hasMany(models.Exam);
      QbPost.belongsTo(models.Tag, { as: 'types', foreignKey: 'type' });
      QbPost.belongsToMany(models.Tag, {
        as: 'tags',
        foreignKey: 'qbpostId',
        otherKey: 'tagId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'question_types',
        foreignKey: 'qbpostId',
        otherKey: 'question_typeId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'grades',
        foreignKey: 'qbpostId',
        otherKey: 'gradeId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'subjects',
        foreignKey: 'qbpostId',
        otherKey: 'subjectId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'topics',
        foreignKey: 'qbpostId',
        otherKey: 'topicId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'boardyears',
        foreignKey: 'qbpostId',
        otherKey: 'boardyearId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'exercises',
        foreignKey: 'qbpostId',
        otherKey: 'exerciseId',
        through: '__QbPost_Tags',
      });
      QbPost.belongsToMany(models.Tag, {
        as: 'syllabuses',
        foreignKey: 'qbpostId',
        otherKey: 'syllabusId',
        through: '__QbPost_Tags',
      });
    }
  }
  QbPost.init(
    {
      __parentId: DataTypes.INTEGER,
      __relevantId: DataTypes.INTEGER,
      __orderInParent: DataTypes.INTEGER,
      __hierarchyLevel: DataTypes.INTEGER,
      type: DataTypes.INTEGER, // OTO with Tags model
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      content: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('content');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('content', {});
          }
          return this.setDataValue('content', value);
        },
      },
      category1: DataTypes.INTEGER, // grade - OTO with tags model
      category2: DataTypes.INTEGER, // subject - OTO with tags model
      category3: DataTypes.INTEGER, // qSuperType - OTO with tags model
      category4: DataTypes.INTEGER, // qType - OTO with tags model
      difficulty: {
        type: DataTypes.INTEGER,
      },
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
      __type: DataTypes.STRING, //
      __status: DataTypes.STRING, // enabled, disabled, etc.
      __visibility: DataTypes.STRING, // public, private, etc.
      __createdBy: DataTypes.UUID,
      __lang: DataTypes.STRING,

      // virtual fields
      __question_typesArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('question_types');
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
      __topicsArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('topics');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __boardyearsArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('boardyears');
          let _ret = [];
          if (rawValue) {
            rawValue.forEach((item) => {
              _ret.push(item.id);
            });
          }
          return _ret;
        },
      },
      __exercisesArray: {
        type: DataTypes.VIRTUAL,
        get() {
          const rawValue = this.getDataValue('exercises');
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
      modelName: 'QbPost',
      paranoid: true,
    }
  );
  return QbPost;
};
