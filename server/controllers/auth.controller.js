const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { createToken } = require('../helpers/token.helper')
const Users = require('../models/User')

module.exports = {
  /**
   * User login.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    try {
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ email: username }, { username }]
        }
      })

      // if user not exist than return status 400
      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'Email or Username is invalid.'
        })
      }

      // if user exist than compare password
      // password comes from the user
      // user.password comes from the database
      const compareAttempt = bcrypt.compareSync(password, user.password.replace(/^\$2y/, '$2b'))
      if (!compareAttempt) {
        return res.status(400).json({
          status: false,
          message: 'This password is invalid.'
        })
      }

      res.status(200).json(createToken(user))
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}