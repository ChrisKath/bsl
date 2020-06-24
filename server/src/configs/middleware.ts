import { validationResult } from 'express-validator'

export default (req: any, res: any, next: any): void => {
  console.log(1);
  
  req.validate = (): void => {
    const errors: any = validationResult(req).array()

    if (errors.length == 0) {
      return
    }

    throw new Error(`${errors[0].param}: ${errors[0].msg}`)
  }

  next()
}