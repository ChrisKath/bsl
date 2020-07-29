import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Controller from './controller'
import User from '../database/entity/user'

class UserController extends Controller {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const user: User[] = await getRepository(User)
        .createQueryBuilder('user')
        .getMany()

      res.json(user)
    } catch (error) {
      this.errors(res, error.message, 422)
    }
  }

  /**
   * Store a newly created resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async create (req: Request, res: Response): Promise<any> {
    // TODO: code
  }

  /**
   * Display the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async show (req: Request, res: Response): Promise<any> {
    try {
      const user: User = await getRepository(User)
        .createQueryBuilder('user')
        // .leftJoinAndSelect('user.urls', 'url')
        .where('user.id = :value', { value: req.params.id })
        .getOne()

      res.send(user)
    } catch (error) {
      res.json(error)
      // this.errors(res, error.message, 422)
    }
  }

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async update (req: Request, res: Response): Promise<any> {
    // TODO: code
  }

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async destroy (req: Request, res: Response): Promise<any> {
    // TODO: code
  }
}

export default new UserController()