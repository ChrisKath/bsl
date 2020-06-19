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
        return res.status(403).json({
          status: false,
          message: 'Email or Username is invalid.'
        })
      }

      // if user exist than compare password
      // password comes from the user
      // user.password comes from the database
      const compareAttempt = bcrypt.compareSync(password, user.password)
      if (!compareAttempt) {
        return res.status(403).json({
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
   * Microsoft SSPI API (Security Support Provider Interface)
   * SSO Authentication
   * 
   * @param {Request} req
   * @param {Response} res
   */
  sso: async (req, res) => {
    try {
      const sso = req.sso.user
      const employeeId = parseInt(sso.name)
      const user = await users.findOne({
        where: { employeeId }
      })

      if (!user) {
        res.status(403).json({
          status: false,
          message: 'Your account isn\'t activate on this program.<br>Please contact IT Operation team.'
        })
      } else {

        res.json(req.sso)
      }
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
      const result = await users.findByPk(req.user.id, {
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
  },

  /**
   * Update user profile.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  profile: async (req, res) => {
    const userId = req.user.id
    const avatar = req.file.filename

    try {
      // Update storage.
      await users.update({ avatar }, {
        where: { id: userId }
      })

      // get response data after updated.
      const result = await users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      })
      
      res.json({
        status: true,
        data: result,
        message: 'Update success.'
      })
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}