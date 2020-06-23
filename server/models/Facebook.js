module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('facebook', {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'name'
    },
    type: {
      type: DataTypes.STRING(30),
      field: 'type'
    },
    data: {
      type: DataTypes.TEXT,
      field: 'data'
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
    tableName: 'facebook',
    timestamps: true
  })

  return model
}