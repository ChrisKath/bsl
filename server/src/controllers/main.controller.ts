import { Request, Response } from 'express'

export default {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req: Request, res: Response): Promise<any> => {
    // TODO: code
  },

  /**
   * Gatter storage file.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  file: (req: Request, res: Response): void => {
    // TODO: code
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