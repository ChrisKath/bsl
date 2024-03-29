import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import { resErrors } from '../configs/errorHandler'
import { Icon } from '../database'
import { removeFile } from '../helpers/storage'

class IconController {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const icons: Icon[] = await createQueryBuilder(Icon, 'icon')
        .limit(100)
        .getMany()

      res.json(icons)
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
        .into(Icon)
        .values({
          name  : req.body.name,
          image : req.file.filename
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
      const icon: Icon = await createQueryBuilder(Icon, 'icon')
        .where('icon.id = :value', { value: req.params.id })
        .getOne()

      res.send(icon)
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
        .update(Icon)
        .set({
          name  : req.body.name,
          image : req.file.filename
        })
        .where('id = :value', { value: req.params.id })
        .execute()

      // Remove old file.
      if (req.body.image) {
        removeFile('icons', req.body.image)
      }
      
      res.json({
        data: req.file,
        message: 'Update success.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
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
      await createQueryBuilder()
        .delete()
        .from(Icon)
        .where('id = :value', { value: req.params.id })
        .execute()

      removeFile('icons', req.body.image)

      res.json({ message: 'Remove success.' })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }
}

export default new IconController()