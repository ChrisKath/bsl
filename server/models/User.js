const { sequelize } = require('../configs/databases')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  email: {
    type: DataTypes.STRING,
    field: 'email'
  },
  username: {
    type: DataTypes.STRING,
    field: 'username'
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
    set (value) {
      let hash = bcrypt.hashSync(value, 10)
      this.setDataValue('password', hash.replace(/^\$2b/, '$2y'))
    }
  },
  passive: {
    type: DataTypes.BOOLEAN,
    field: 'passive',
    defaultValue: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    field: 'isAdmin',
    defaultValue: false
  },
  createdBy: {
    type: DataTypes.INTEGER(10),
    field: 'created_by'
  },
  updatedBy: {
    type: DataTypes.INTEGER(10),
    field: 'updated_by'
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
  tableName: 'users',
  timestamps: true
})