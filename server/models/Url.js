module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('urls', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(12),
      field: 'key'
    },
    href: {
      type: DataTypes.TEXT,
      field: 'href'
    },
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    type: {
      type: DataTypes.INTEGER,
      field: 'type',
      defaultValue: 1
    },
    expiry: {
      type: DataTypes.DATE,
      field: 'expiry',
      allowNull: true,
      set (value) {
        this.setDataValue('expiry', value || null)
      }
    },
    redirect: {
      type: DataTypes.TEXT,
      field: 'redirect',
      allowNull: true,
      set (value) {
        this.setDataValue('redirect', value || null)
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      field: 'enabled',
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER(10),
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.INTEGER(10),
      field: 'updated_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'urls',
    timestamps: true,
    indexes: [{
      fields: ['created_by', 'updated_by'],
      unique: false
    }]
  })

  // Alias of relationship
  model.associate = (models) => {
    model.belongsToMany(models.tags, {
      through: models.tagging,
      foreignKey: 'urlId',
      otherKey: 'tagId'
    })

    model.belongsTo(models.users, {
      as: 'creater',
      foreignKey: 'createdBy'
    })

    model.belongsTo(models.users, {
      as: 'updater',
      foreignKey: 'updatedBy'
    })

    model.hasMany(models.clicks, { foreignKey: 'urlId' })
  }

  return model
}