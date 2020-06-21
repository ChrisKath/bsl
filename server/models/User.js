const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    employeeCode: {
      type: DataTypes.INTEGER(6),
      field: 'employeeCode',
      unique: true,
      allowNull: false
    },
    employeeName: {
      type: DataTypes.STRING(64),
      field: 'employeeName'
    },
    username: {
      type: DataTypes.STRING(16),
      field: 'username',
      unique: true,
      allowNull: false,
      set (value) {
        this.setDataValue('username', value.toLowerCase())
      }
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      set (value) {
        if (value) this.setDataValue('password', bcrypt.hashSync(value, 10))
      }
    },
    avatar: {
      type: DataTypes.STRING(210),
      field: 'avatar',
      allowNull: true
    },
    activated: {
      type: DataTypes.BOOLEAN,
      field: 'activated',
      defaultValue: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: 'isAdmin',
      defaultValue: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
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
    timestamps: true,
    indexes: [
      { fields: ['employeeCode', 'username'], unique: true },
      { fields: ['created_by', 'updated_by'] }
    ]
  })

  // Alias of relationship
  model.associate = (models) => {
    model.hasMany(models.urls, {
      as: 'creater',
      foreignKey: 'createdBy'
    })

    model.hasMany(models.urls, {
      as: 'updater',
      foreignKey: 'updatedBy'
    })
  }

  return model
}