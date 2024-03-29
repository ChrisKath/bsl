import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import { createReadStream, ReadStream } from 'fs'
import { join } from 'path'
import { resErrors } from '../configs/errorHandler'
import { Url } from '../database'
import service from '../services/main.service'

class MainController {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async index (req: Request, res: Response): Promise<any> {
    const keyCode: string | boolean = service.getKeyCode(req.baseUrl)

    if (keyCode) {
      try {
        const url: Url = await createQueryBuilder(Url, 'url')
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
          return res.sendFile(join(__dirname, '../../public/404.html'))
        }

        // save click-logs
        service.saveClickLogs(url.id, req)
        
        // if this Url is expired, redirect to setting value
        if (url.expiry && service.isExpired(url.expiry)) {
          if (url.redirect) {
            return res.redirect(url.redirect)
          } else {
            return res.sendFile(join(__dirname, '../../public/404.html'))
          }
        }

        // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
        // const isFacebook = await service.isFacebook(query.href)

        // redirect to endpoint-target
        res.redirect(url.href)
      } catch (error) {
        resErrors(res, error.message, 422)
      }
    } else {
      // response to console panel.
      res.sendFile(join(__dirname, '../../public/index.html'))
    }
  }

  /**
   * Gatter storage file.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public file (req: Request, res: Response): void {
    const pathFile: string = join(__dirname, `../../storage/${req.params.dest}/${req.params.name}`)
    const readStream: ReadStream = createReadStream(pathFile)

    readStream.on('open', (): void => {
      res.set('Content-Type', 'image/jpeg')
      readStream.pipe(res)
    })

    readStream.on('error', (): void => {
      res.status(404).end()
    })
  }

  /**
   * Demo test controller.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  public async d3m0 (req: Request, res: Response): Promise<any> {
    // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
    // const isFacebook = await service.isFacebook('https://www.facebook.com/snippetsJS/photos/a.108956220490532/293276618725157/')

    res.json(process.env)
  }
}

export default new MainController()