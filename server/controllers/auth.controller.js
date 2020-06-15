const { Op, users } = require('../configs/databases')
const { createToken } = require('../helpers/token.helper')
const bcrypt = require('bcrypt')

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
      const user = await users.findOne({
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
      const compareAttempt = bcrypt.compareSync(password, user.password)
      if (!compareAttempt) {
        return res.status(400).json({
          status: false,
          message: 'This password is invalid.'
        })
      }

      res.json(createToken(user))
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Get user details.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  me: async (req, res) => {
    try {
      const result = await urls.findByPk(req.user.id, {
        attributes: {
          exclude: ['password']
        }
      })
      
      res.json(result)
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Refresh token expire.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  refresh: (req, res) => {
    res.json(createToken(req.user))
  }
}