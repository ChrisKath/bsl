const { validationResult } = require('express-validator')
const { Op, users } = require('../configs/databases')
const { createToken } = require('../helpers/token.helper')
const service = require('../services/auth.service')
const bcrypt = require('bcrypt')

module.exports = {
  /**
   * Login with username and password.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    const username = (req.body.username || null)
    const password = (req.body.password || null)

    try {
      const user = await users.findOne({
        attributes: ['id', 'employeeCode', 'employeeName', 'username', 'password', 'activated'],
        where: {
          [Op.or]: [
            { employeeCode: username },
            { username: username.toLowerCase() }
          ]
        }
      })

      // if undefined user
      if (!user) {
        return res.error('Employee Code or Username is invalid.', 403)
      }

      // Suspend user
      if (!user.activated) {
        return res.error('Your account has been suspended.', 403)
      }

      // response data
      const results = createToken(user)
      if (user.password) {
        // if user exist than compare password
        // password comes from the user
        // user.password comes from the database
        const compareAttempt = bcrypt.compareSync(password, user.password)
        if (!compareAttempt) {
          return res.error('This password is invalid.', 403)
        }
      } else {
        // update user-info if field is empty
        await service.ssoAssignData(req, user)
        results.firstLogin = true
      }

      res.json(results)
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
    const data = service.ssoAccessData(req)

    if (!data) {
      return res.error('This device cannot access the SSO Function.', 409)
    }

    try {
      const user = await users.findOne({
        attributes: ['id', 'employeeCode', 'employeeName', 'username', 'password', 'activated'],
        where: {
          employeeCode: data.employeeCode
        }
      })

      // if user not found
      if (!user) {
        return res.error('Your account isn\'t activate on this program.<br>Please contact IT Operation team.', 403)
      }

      // Suspend user
      if (!user.activated) {
        return res.error('Your account has been suspended.', 403)
      }

      // update user-info if field is empty
      await service.ssoAssignData(data, user)

      // response data
      let results = createToken(user)
      if (!user.password) {
        results.firstLogin = true
      }

      res.json(results)
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
      const user = await users.findByPk(req.user.id, {
        attributes: {
          exclude: ['password']
        }
      })
      
      res.json(user)
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
    const avatar = req.file.filename

    try {
      // Update storage.
      await users.update({ avatar }, {
        where: { id: req.user.id }
      })

      // Remove old file.
      if (req.body.avatar) {
        removeFile('avatar', req.body.avatar)
      }
      
      res.json({
        data: { avatar },
        message: 'Update success.'
      })
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}