module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('clicks', {
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
    userIp: {
      type: DataTypes.TEXT,
      field: 'user_ip'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    clickedAt: {
      type: DataTypes.DATE,
      field: 'clicked_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'clicks',
    timestamps: false,
    indexes: [{
      fields: ['url_id'],
      unique: false
    }]
  })

  // Alias of relationship
  model.associate = (models) => {
    model.belongsTo(models.urls, { foreignKey: 'urlId' })
  }

  return model
}