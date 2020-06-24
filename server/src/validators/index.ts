import { validationResult } from 'express-validator'

// Import Validators
const validators: any = {
  auth: require('./auth'),
  user: require('./user')
}

export default {
  check: (req: any, res: any, next: any): any => {
    let errors: any = validationResult(req).array()
    if (errors.length == 0) {
      return next()
    }

    let error: any = new Error(`${errors[0].param}: ${errors[0].msg}`)
    error.status = 422
    throw error
  },

  ...validators
}