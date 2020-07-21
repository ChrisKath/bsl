import { Request, Response, NextFunction } from 'express'
import HttpException from '@/helpers/HttpException'
import { production } from '@/configs/app'

/**
 * catch 404 and forward to error handler
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function errorEndpoint (req: Request, res: Response, next: NextFunction): void {
  const error: any = new Error('Endpoint Not Found')
  error.status = 404
  next(error)
}

/**
 * Defining Express error handling middleware
 * 
 * @param {HttpException} error 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function errorHandler (error: HttpException, req: Request, res: Response, next: NextFunction): void {
  if (!production) console.log(error.stack)

  const status: number = error.status || 500
  const message: string = error.message || 'Something went wrong'
  res.status(status).send({
    status,
    message,
  })
}