import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'
import { createToken } from '../helpers/token.helper'
import { resErrors } from '../configs/errorHandler'
import bcrypt from 'bcrypt'
import User from '../database/entity/user'
import { removeFile } from '../storage'

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
          'user.id',
          'user.employeeCode',
          'user.employeeName',
          'user.username',
          'user.password',
          'user.activated'
        ])
        .where('user.employeeCode = :username', { username })
        .orWhere('user.username = :username', { username: username.toLowerCase() })
        .getOne()

      // if undefined user
      if (!user) {
        return resErrors(res, 'Employee Code or Username is invalid.', 404)
      }

      // Suspend user
      if (!user.activated) {
        return resErrors(res, 'Your account has been suspended.', 403)
      }

      // response data
      let results: any = {}
      if (user.password) {
        // if user exist than compare password
        // password comes from the user
        // user.password comes from the database
        const compareAttempt = bcrypt.compareSync(password, user.password)
        if (!compareAttempt) {
          return resErrors(res, 'This password is invalid.', 404)
        }
      } else {
        results.firstLogin = true
      }

      res.json(Object.assign(results, createToken(user)))
    } catch (error) {
      resErrors(res, error.message, 422)
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
    try {
      const user: User = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: req.user.id })
        .getOne()
      
      res.json(user)
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  },

  /**
   * Update user profile.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  profile: async (req: Request, res: Response): Promise<any> => {
    const avatar: string = req.file.filename

    try {
      // Update entity.
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ avatar })
        .where('id = :id', { id: req.user.id })
        .execute()

      // Remove old file.
      if (req.body.avatar) {
        removeFile('avatar', req.body.avatar)
      }
      
      res.json({
        data: { avatar },
        message: 'Update success.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
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