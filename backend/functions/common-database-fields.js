exports.common_category_fields = (
  queryInterface,
  Sequelize,
  sequelize,
  DataTypes
) => {
  let migration;
  let model;
  if (queryInterface && Sequelize) {
    migration = {};
  } else {
    model = {};
  }

  let ret = {
    migration: migration,
    model: model,
  };
  return ret;
};

exports.common_end_fields = (
  queryInterface,
  Sequelize,
  sequelize,
  DataTypes
) => {
  let migration;
  let model;
  if (queryInterface && Sequelize) {
    migration = {
      _icon: {
        type: Sequelize.STRING,
      },
      _slug: {
        type: Sequelize.STRING,
      },
      _type: {
        type: Sequelize.STRING,
      },
      _textual_tags: {
        type: Sequelize.STRING,
      },
      _shortcode: {
        type: Sequelize.STRING,
      },
      _misc: {
        type: Sequelize.JSON,
      },
      _raw: {
        type: Sequelize.JSON,
      },
      _parent_id: {
        type: Sequelize.INTEGER,
      },
      _order_in_parent: {
        type: Sequelize.INTEGER,
      },
      _hierarchy_level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      _tree_level: {
        type: Sequelize.INTEGER,
      },
      _tree_format: {
        type: Sequelize.STRING,
      },
      _status: {
        type: Sequelize.STRING,
        defaultValue: '_ENABLED',
      },
      _visibility: {
        type: Sequelize.STRING,
        defaultValue: '_PUBLIC',
      },
      _lang: {
        type: Sequelize.STRING,
        defaultValue: '_EN',
      },
      _created_by: {
        type: Sequelize.UUID,
      },
      _created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      _updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      _deleted_at: {
        type: Sequelize.DATE,
      },
    };
  } else {
    model = {
      _icon: DataTypes.STRING,
      _slug: {
        type: DataTypes.STRING,
      },
      _type: DataTypes.STRING,
      _textual_tags: DataTypes.STRING,
      _shortcode: DataTypes.STRING,
      _misc: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('_misc');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('_misc', {});
          }
          return this.setDataValue('_misc', value);
        },
      },
      _raw: {
        type: DataTypes.JSON,
        get() {
          const rawValue = this.getDataValue('_raw');
          if (!rawValue) return null;
          if (typeof rawValue == typeof {}) {
            return rawValue;
          }
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set: function (value) {
          if (value.constructor != {}.constructor) {
            return this.setDataValue('_raw', {});
          }
          return this.setDataValue('_raw', value);
        },
      },
      _parent_id: DataTypes.INTEGER,
      _order_in_parent: DataTypes.INTEGER,
      _hierarchy_level: DataTypes.INTEGER,
      _tree_level: {
        type: DataTypes.INTEGER,
      },
      _tree_format: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('_tree_format');
          let _ret = rawValue;
          return _ret;
        },
      },
      _status: DataTypes.STRING,
      _visibility: DataTypes.STRING,
      _lang: DataTypes.STRING,
      _created_by: DataTypes.UUID,
    };
  }

  let ret = {
    migration: migration,
    model: model,
  };
  return ret;
};
