const Users = require('../models/User')

const methods = {
  async all (req, res) {
    try {
      const result = await Users.findAll({
        attributes: { exclude: ['password'] }
      })
      res.json(result)
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
} 

module.exports = { ...methods }