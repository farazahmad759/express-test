'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.belongsTo(models.User, {
        foreignKey: '__createdBy',
      });
      Exam.belongsToMany(models.QbPost, { through: '__QbPost_QbPosts' });
    }
  }
  Exam.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      qbposts: DataTypes.TEXT,
      author: DataTypes.STRING,
      author_phone: DataTypes.STRING,
      author_info: DataTypes.TEXT,
      author_youtube: DataTypes.STRING,
      author_facebook: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      _grade: DataTypes.STRING,
      _subject: DataTypes.STRING,
      _tags: DataTypes.STRING,
      __raw: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('__raw');
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
    },
    {
      sequelize,
      modelName: 'Exam',
      paranoid: true,
    }
  );
  return Exam;
};
