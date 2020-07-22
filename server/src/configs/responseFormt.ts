import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction): void => {	
  (res as any).error = (errorMessage: string = '', statusCode: number = 500): void => {	
    res.status(statusCode).json({	
      error: {
        status: statusCode,	
        message: errorMessage	
      }	
    })	
  }	

  next()	
} 