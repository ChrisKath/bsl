import { Request, Response } from 'express'
import { createToken } from '@/helpers/token.helper'

export default {
  /**
   * Login with username and password.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
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