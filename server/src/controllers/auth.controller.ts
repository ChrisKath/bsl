import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import bcrypt from 'bcrypt'
import { resErrors } from '../configs/errorHandler'
import { User } from '../database'
import { createToken } from '../helpers/token'
import { removeFile } from '../helpers/storage'
import service from '../services/auth.service'

class AuthController {
  /**
   * Login with username and password.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async login (req: Request, res: Response): Promise<void> {
    const username = (req.body.username || null)
    const password = (req.body.password || null)

    try {
      const user: User = await createQueryBuilder(User, 'user')
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
  }

  /**
   * Microsoft SSPI API (Security Support Provider Interface)
   * SSO Authentication
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async sso (req: Request, res: Response): Promise<void> {
    const data: any = service.ssoAccessData(req)

    if (!data) {
      return resErrors(res, 'This device cannot access the SSO Function.', 409)
    }

    try {
      const user: User = await createQueryBuilder(User, 'user')
        .select([
          'user.id',
          'user.employeeCode',
          'user.employeeName',
          'user.username',
          'user.password',
          'user.activated'
        ])
        .where('user.employeeCode = :value', { value: data.employeeCode })
        .getOne()

      // if user not found
      if (!user) {
        return resErrors(res, 'Your account isn\'t activate on this program.<br>Please contact IT Operation team.', 403)
      }

      // Suspend user
      if (!user.activated) {
        return resErrors(res, 'Your account has been suspended.', 403)
      }

      // update user-info if field is empty
      await service.ssoAssignData(data, user)

      // response data
      let results: any = createToken(user)
      if (!user.password) {
        results.firstLogin = true
      }

      res.json({ ...results, ssoData: data })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }

  /**
   * Get user details.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async me (req: Request, res: Response): Promise<void> {
    try {
      const user: User = await createQueryBuilder(User, 'user')
        .where('user.id = :value', { value: req.user.id })
        .getOne()
      
      res.json(user)
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }

  /**
   * Refresh token expire.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public refresh (req: Request, res: Response): void {
    res.json(createToken(req.user))
  }

  /**
   * Update user profile.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async profile (req: Request, res: Response): Promise<void> {
    const avatar: string = req.file.filename

    try {
      // Update entity.
      await createQueryBuilder()
        .update(User)
        .set({
          avatar,
          updatedBy: req.user.id
        })
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
  }

  /**
   * Setting new password.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async setPassword (req: Request, res: Response): Promise<void> {
    try {
      // Update entity.
      await createQueryBuilder()
        .update(User)
        .set({
          password: req.body.password,
          updatedBy: req.user.id
        })
        .where('id = :id', { id: req.user.id })
        .execute()
      
      res.json({
        data: undefined,
        message: 'Update success.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }
}

export default new AuthController()