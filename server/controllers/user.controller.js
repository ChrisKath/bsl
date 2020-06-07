const Users = require('../models/User')

const methods = {
  async all (req, res) {
    try {
      let result = await Users.findAll()
      res.json(result)
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
} 

module.exports = { ...methods }