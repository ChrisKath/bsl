const { sequelize } = require('../configs/databases')
const { DataTypes } = require('sequelize')
const Clicks = require('./Click')
const Users = require('./User')
const Tags = require('./Tag')

const Urls = sequelize.define('Urls', {
  id: {
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING(16),
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
    defaultValue: null
  },
  redirect: {
    type: DataTypes.TEXT,
    field: 'redirect',
    allowNull: true,
    defaultValue: null
  },
  enable: {
    type: DataTypes.BOOLEAN,
    field: 'enable',
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.INTEGER(10),
    field: 'created_by',
    references: {
      model: 'users',
      key: 'id',
    }
  },
  updatedBy: {
    type: DataTypes.INTEGER(10),
    field: 'updated_by',
    references: {
      model: 'users',
      key: 'id',
    }
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
  timestamps: true
})

Urls.belongsToMany(Tags, {
  through: 'url_has_tags',
  foreignKey: 'urls_id',
  timestamps: false
})

Tags.belongsToMany(Urls, {
  through: 'url_has_tags',
  foreignKey: 'tags_id',
  timestamps: false
})

Urls.hasMany(Clicks, {
  foreignKey: 'urls_id',
  timestamps: false
})

Users.hasMany(Urls, {
  as: 'creater',
  foreignKey: 'created_by'
})

// Urls.belongsTo(Users, {
//   as: 'creater',
//   foreignKey: 'created_by'
// })

// Urls.belongsTo(Users, {
//   as: 'updater',
//   foreignKey: 'updated_by'
// })

module.exports = Urls