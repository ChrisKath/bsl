const Users = require('../models/User')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
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