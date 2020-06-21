module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('icons', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      field: 'name'
    },
    image: {
      type: DataTypes.STRING(210),
      field: 'image',
      allowNull: true,
      defaultValue: null
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
    tableName: 'icons',
    timestamps: true
  })

  return model
}