const { sequelize } = require('../configs/databases')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('QrBrands', {
  id: {
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(64),
    field: 'name'
  },
  image: {
    type: DataTypes.STRING(128),
    field: 'image',
    allowNull: true,
    defaultValue: null
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'qr_brandes',
  timestamps: true
})