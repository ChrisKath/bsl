const Sequelize = require('sequelize')
const config = require('../configs/app')

// Create connection.
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

// import models.
const db = {
  clicks    : require('../models/click')(sequelize, Sequelize.DataTypes),
  facebook  : require('../models/facebook')(sequelize, Sequelize.DataTypes),
  icons     : require('../models/icon')(sequelize, Sequelize.DataTypes),
  tags      : require('../models/tag')(sequelize, Sequelize.DataTypes),
  tagging   : require('../models/tagging')(sequelize, Sequelize.DataTypes),
  urls      : require('../models/url')(sequelize, Sequelize.DataTypes),
  users     : require('../models/user')(sequelize, Sequelize.DataTypes)
}

// Run models relationship.
for (const propName in db) {
  if ('associate' in db[propName]) db[propName].associate(db)
}

// Add prototype.
db.Sequelize = Sequelize
db.Op = Sequelize.Op

module.exports = db