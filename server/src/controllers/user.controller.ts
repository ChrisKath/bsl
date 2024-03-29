import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import { resErrors } from '../configs/errorHandler'
import { User } from '../database'

class UserController {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const user: User[] = await createQueryBuilder(User, 'user')
        .limit(100)
        .getMany()

      res.json(user)
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }

  /**
   * Store a newly created resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async create (req: Request, res: Response): Promise<any> {
    try {
      // store a newly.
      const store: any = await createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...req.body,
          createdBy: req.user.id,
          updatedBy: req.user.id
        })
        .execute()
        
      res.json({
        data: store,
        message: 'Create success.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }

  /**
   * Display the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async show (req: Request, res: Response): Promise<any> {
    try {
      const user: User = await createQueryBuilder(User, 'user')
        .leftJoinAndSelect('user.accountCreatedBy', 'createdBy')
        .leftJoinAndSelect('user.accountUpdatedBy', 'updatedBy')
        .where('user.id = :value', { value: req.params.id })
        .getOne()

      res.send(user)
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async update (req: Request, res: Response): Promise<any> {
    try {
      // Update storage.
      await createQueryBuilder()
        .update(User)
        .set({
          ...req.body,
          updatedBy: req.user.id
        })
        .where('id = :value', { value: req.params.id })
        .execute()

      res.json({
        data: undefined,
        message: 'Update success.'
      })
    } catch (error) {
      resErrors(res, 'Not allowed to use [EmployeeCode and Username] same as another account')
    }
  }

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async destroy (req: Request, res: Response): Promise<any> {
    try {
      // Update storage, deactivated account.
      await createQueryBuilder()
        .update(User)
        .set({ activated: false })
        .where('id = :value', { value: req.params.id })
        .execute()

      res.json({
        data: undefined,
        message: 'deactivated.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }
}

export default new UserController()