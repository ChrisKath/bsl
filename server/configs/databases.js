const config = require('../configs/app')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,

  pool: {
    min: 0,
    max: 10,
    idle: 1e4,
    acquire: 3e4
  }
})

module.exports = { sequelize, Sequelize }