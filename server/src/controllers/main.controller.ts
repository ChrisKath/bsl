import { Request, Response } from 'express'
import { createReadStream, ReadStream } from 'fs'
import { join } from 'path'
import { getRepository } from 'typeorm'
import service from '../services/main.service'
import Url from '../database/entity/url'

export default {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req: Request, res: Response): Promise<any> => {
    const keyCode: string | boolean = service.getKeyCode(req.baseUrl)

    if (keyCode) {
      try {
        const url: Url = await getRepository(Url)
          .createQueryBuilder('url')
          .select([
            'url.id',
            'url.href',
            'url.expiry',
            'url.redirect'
          ])
          .where('key = :value', { value: keyCode })
          .andWhere('enabled = :value', { value: true })
          .getOne()

        // if {keyCode} not match
        if (!url) {
          return res.sendFile(join(__dirname, '../public/404.html'))
        }

        // save click-logs
        service.saveClickLogs(url.id, req)
        
        // if this Url is expired, redirect to setting value
        if (url.expiry && service.isExpired(url.expiry)) {
          if (url.redirect) {
            return res.redirect(url.redirect)
          } else {
            return res.sendFile(join(__dirname, '../public/404.html'))
          }
        }

        // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
        // const isFacebook = await service.isFacebook(query.href)

        // redirect to endpoint-target
        res.redirect(url.href)
      } catch (error) {
        res.error(error.message, error.status)
      }
    } else {
      // response to console panel.
      res.sendFile(join(__dirname, '../public/index.html'))
    }
  },

  /**
   * Gatter storage file.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  file: (req: Request, res: Response): void => {
    const pathFile: string = join(__dirname, `../storage/${req.params.dest}/${req.params.name}`)
    const readStream: ReadStream = createReadStream(pathFile)

    readStream.on('open', (): void => {
      res.set('Content-Type', 'image/jpeg')
      readStream.pipe(res)
    })

    readStream.on('error', (): void => {
      res.status(404).end()
    })
  },

  /**
   * Demo test controller.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  d3m0: async (req: Request, res: Response): Promise<any> => {
    // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
    // const isFacebook = await service.isFacebook('https://www.facebook.com/snippetsJS/photos/a.108956220490532/293276618725157/')

    res.json(process.env)
  }
}