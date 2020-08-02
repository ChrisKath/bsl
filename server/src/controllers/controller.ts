import { Response } from 'express'

export default class Controller {
  /**
   * Defining response success format
   * 
   * @param {Request} req
   * @param {object} data
   * @param {number} statusCode
   */
  public success (res: Response, data: any, statusCode?: number) {
    res.status(statusCode || 200).send(data)
  }

  /**
   * Defining response error format
   * 
   * @param {Request} req
   * @param {string} errorMessage
   * @param {number} statusCode
   */
  public error (res: Response, errorMessage: string = '', statusCode: number = 500): void {	
    res.status(statusCode)
      .json({
        error: {
          status: statusCode,
          message: errorMessage
        }
      })
  }
}