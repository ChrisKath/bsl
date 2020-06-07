const { check } = require('express-validator')

module.exports = {
  post: [
    check('username')
      .notEmpty().withMessage('is empty'),

    check('password')
      .notEmpty().withMessage('is empty')
  ]
}