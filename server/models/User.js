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
        this.setDataValue('password', bcrypt.hashSync(value, 10))
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      field: 'enabled',
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
      { fields: ['email', 'username'], unique: true },
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