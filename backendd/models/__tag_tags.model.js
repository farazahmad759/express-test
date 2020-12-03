'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class __Tag_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  __Tag_Tags.init(
    {
      tagId: DataTypes.INTEGER,
      ancestorId: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
      syllabusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: '__Tag_Tags',
      paranoid: true,
    }
  );
  return __Tag_Tags;
};
