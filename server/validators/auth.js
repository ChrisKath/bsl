const { check } = require('express-validator')

module.exports = {
  login: [
    check('username')
      .notEmpty()
      .withMessage('Username is required')
  ]
}