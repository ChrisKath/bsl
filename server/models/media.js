module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('media', {
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
    image: {
      type: DataTypes.STRING(200),
      field: 'image',
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'social_media',
    timestamps: false
  })

  return model
}