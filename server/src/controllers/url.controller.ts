import { Request, Response } from 'express'
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm'
import { Url, Click, Tagging } from '../database'
import { resErrors } from '../configs/errorHandler'
import service from '../services/url.service'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'

class UrlController {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const urls: Url[] = await createQueryBuilder(Url, 'url')
        .loadRelationCountAndMap('url.totalClicks', 'url.clicks')
        .limit(100)
        .getMany()

      res.json(urls)
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
    // Check URL already exists.
    const hasExists: boolean = await service.hasOriginUrl(req.body.href)
    if (hasExists) {
      return resErrors(res, 'This URL already exists.', 409)
    }

    // getters variable.
    const keyCode: string = await service.runKeyCode()
    const url: URL = new URL(req.body.href)

    try {
      // store a newly.
      const { identifiers }: any = await createQueryBuilder()
        .insert()
        .into(Url)
        .values({
          key       : keyCode,
          href      : req.body.href,
          title     : req.body.title || url.hostname,
          expiry    : req.body.expiry,
          redirect  : req.body.redirect,
          createdBy : req.user.id,
          updatedBy : req.user.id
        })
        .execute()

      // push tagging
      await service.addTagging(identifiers[0].id, req.body.tags)

      res.json({
        data: identifiers[0],
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
      const { id }: any = req.params
      const url: Url = await createQueryBuilder(Url, 'url')
        .leftJoinAndSelect('url.tags', 'tags')
        .leftJoinAndSelect('url.urlCreatedBy', 'createdBy')
        .leftJoinAndSelect('url.urlUpdatedBy', 'updatedBy')
        .loadRelationCountAndMap('url.totalClicks', 'url.clicks')
        .where('url.id = :value', { value: id })
        .getOne()

      res.json(url)
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
    // Check KeyCode already exists.
    if (req.body.key) {
      const existKeyCode: boolean = await service.hasKeyCode(req.body.key)
      if (existKeyCode) {
        return resErrors(res, 'This ShortKey already exists.', 409)
      }
    }

    // Check URL already exists.
    const existHref: boolean = await service.hasOriginUrl(req.body.href)
    if (existHref) {
      return resErrors(res, 'This URL already exists.', 409)
    }

    // getters variable.
    const id: number = Number(req.params.id)
    const keyCode: string = req.body.key || service.runKeyCode()

    try {
      // Update storage.
      await createQueryBuilder()
        .update(Url)
        .set({
          key       : keyCode,
          href      : req.body.href,
          title     : req.body.title,
          expiry    : req.body.expiry,
          redirect  : req.body.redirect,
          updatedBy : req.user.id
        })
        .where('id = :value', { value: id })
        .execute()

      // add tagging.
      service.addTagging(id, req.body.tags)

      res.json({
        data: undefined,
        message: 'Update success.'
      })
    } catch (error) {
      resErrors(res, error.message)
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
        .where('url_id = :value', { value: id })
        .execute()

      await createQueryBuilder()
        .delete()
        .from(Url)
        .where('id = :value', { value: id })
        .execute()

      await createQueryBuilder()
        .delete()
        .from(Click)
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


  // ************************************************************************
  // ***************************** OTHER ROUTER *****************************
  // ************************************************************************

  /**
   * Display a listing of the resource by filter.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async search (req: Request, res: Response): Promise<any> {
    // TODO: code
  }

  /**
   * Statistic clicks logs.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async statistic (req: Request, res: Response): Promise<any> {
    // TODO: code
  }
}

export default new UrlController()