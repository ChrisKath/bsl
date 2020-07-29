import { Response } from 'express'

export default class BaseController {
  /**
   * Defining response error format
   * 
   * @param {Request} req
   * @param {string} errorMessage
   * @param {number} statusCode
   */
  public errors (res: Response, errorMessage: string = '', statusCode: number = 500): void {	
    res.status(statusCode).json({
      error: {
        status: statusCode,
        message: errorMessage
      }
    })
  }
}
