import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import { resErrors } from '../configs/errorHandler'
import { Tag, Tagging } from '../database'
import service from '../services/tag.service'

class TagController {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const tags: Tag[] = await createQueryBuilder(Tag, 'tag')
        .limit(100)
        .getMany()

      res.json(tags)
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
    const tagName: string = req.body.name

    try {
      // Check is exists.
      const hasExists = await service.hasTagName(tagName)
      if (hasExists) {
        return resErrors(res, `This [${tagName}] already exists.`, 409)
      }

      // store a newly.
      const store: any = await createQueryBuilder()
        .insert()
        .into(Tag)
        .values({ name: req.body.name })
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
      const tag: Tag = await createQueryBuilder(Tag, 'tag')
        .where('tag.id = :value', { value: req.params.id })
        .getOne()

      res.send(tag)
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
    const tagName: string = req.body.name

    try {
      // Check is exists.
      const hasExists = await service.hasTagName(tagName)
      if (hasExists) {
        return resErrors(res, `This [${tagName}] already exists.`, 409)
      }

      // Update storage.
      await createQueryBuilder()
        .update(Tag)
        .set({ name: req.body.name })
        .where('id = :value', { value: req.params.id })
        .execute()

      res.json({
        data: undefined,
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
    const id: number = Number(req.params.id)

    try {
      await createQueryBuilder()
        .delete()
        .from(Tagging)
        .where('tagId = :value', { value: id })
        .execute()

      await createQueryBuilder()
        .delete()
        .from(Tag)
        .where('id = :value', { value: id })
        .execute()
      
      res.json({
        data: undefined,
        message: 'Remove success.'
      })
    } catch (error) {
      resErrors(res, error.message, 422)
    }
  }
}

export default new TagController()