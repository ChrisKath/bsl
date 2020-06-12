const { sequelize } = require('../configs/databases')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('Clicks', {
  id: {
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
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
  timestamps: false
})