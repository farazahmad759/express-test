'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Exam, {
        foreignKey: {
          name: '__createdBy',
          as: '__createdBy',
        },
      });
    }
  }
  User.init(
    {
      uuid: DataTypes.UUID,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
      __permissions: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  );
  return User;
};
