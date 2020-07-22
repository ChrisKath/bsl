import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Icon from '../database/entity/icon'

export default {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req: Request, res: Response): Promise<any> => {
    try {
      const icons: Icon[] = await getRepository(Icon)
        .createQueryBuilder('icon')
        .getMany()

      res.send(icons)
    } catch (error) {
      res.json({ error })
    }
  },

  /**
   * Store a newly created resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Display the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  show: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  destroy: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  }
}