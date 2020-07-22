import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { createToken } from '../helpers/token.helper'
import bcrypt from 'bcrypt'
import User from '../database/entity/user'

export default {
  /**
   * Login with username and password.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req: Request, res: Response): Promise<any> => {
    const username = (req.body.username || null)
    const password = (req.body.password || null)

    try {
      const user: User = await getRepository(User)
        .createQueryBuilder('user')
        .select([
          'id',
          'employeeCode',
          'employeeName',
          'username',
          'password',
          'activated'
        ])
        .where('employeeCode = :username', { username })
        .orWhere('username = :username', { username: username.toLowerCase() })
        .getOne()

      // if undefined user
      if (!user) {
        return res.error('Employee Code or Username is invalid.', 404)
      }

      // Suspend user
      if (!user.activated) {
        return res.error('Your account has been suspended.', 403)
      }

      // response data
      let results: any = {}
      if (user.password) {
        // if user exist than compare password
        // password comes from the user
        // user.password comes from the database
        const compareAttempt = bcrypt.compareSync(password, user.password)
        if (!compareAttempt) {
          return res.error('This password is invalid.', 404)
        }
      } else {
        results.firstLogin = true
      }

      res.json(Object.assign(results, createToken(user)))
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
  sso: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Get user details.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  me: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Update user profile.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  profile: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Refresh token expire.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  refresh: (req: Request, res: Response): void => {
    res.json(createToken(req.user))
  },
}