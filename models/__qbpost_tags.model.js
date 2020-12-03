'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class __QbPost_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  __QbPost_Tags.init(
    {
      tagId: DataTypes.INTEGER,
      qbpostId: DataTypes.INTEGER,
      question_typeId: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
      topicId: DataTypes.INTEGER,
      boardyearId: DataTypes.INTEGER,
      syllabusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: '__QbPost_Tags',
      paranoid: true,
    }
  );
  return __QbPost_Tags;
};
