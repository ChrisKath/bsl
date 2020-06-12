const { sequelize } = require('../configs/databases')
const { DataTypes } = require('sequelize')

const Tagging = sequelize.define('Tagging', {
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
  freezeTableName: true
})

Tagging.removeAttribute('id')

module.exports = Tagging