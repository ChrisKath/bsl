module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'name'
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
    tableName: 'tags',
    timestamps: true
  })

  // Alias of relationship
  model.associate = (models) => {
    model.belongsToMany(models.urls, {
      through: models.tagging,
      foreignKey: 'tagId',
      otherKey: 'urlId'
    })
  }

  return model
}