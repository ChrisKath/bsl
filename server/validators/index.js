const { validationResult } = require('express-validator')

// Import Validators
const validators = {
  auth: require('./auth'),
  user: require('./user')
}

module.exports = {
  check (req, res, next) {
    let errors = validationResult(req).array()
    if (errors.length == 0) return next()
    let error = new Error(`${errors[0].param}: ${errors[0].msg}`)
    error.status = 422
    throw error
  },

  ...validators
}