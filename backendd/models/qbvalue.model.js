'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QbValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QbValue.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: DataTypes.TEXT,
      __shortcode: DataTypes.STRING,
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
      __tablename: DataTypes.STRING,
      __status: DataTypes.STRING,
      __visibility: DataTypes.STRING,
      __createdBy: DataTypes.UUID,
      __lang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'QbValue',
    }
  );
  return QbValue;
};
