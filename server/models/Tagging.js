module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('tagging', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    urlId: {
      type: DataTypes.INTEGER,
      field: 'url_id'
    },
    tagId: {
      type: DataTypes.INTEGER,
      field: 'tag_id'
    }
  }, {
    tableName: 'tagging',
    timestamps: false,
    indexes: [{
      fields: ['url_id', 'tag_id'],
      unique: false
    }]
  })

  // Alias of relationship
  model.associate = (models) => {
    model.belongsTo(models.urls, {
      targetKey: 'id',
      foreignKey: 'urlId'
    })

    model.belongsTo(models.tags, {
      targetKey: 'id',
      foreignKey: 'tagId'
    })
  }

  return model
}