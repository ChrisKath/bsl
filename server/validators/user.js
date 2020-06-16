const { check } = require('express-validator')

module.exports = {
  post: [
    check('username').notEmpty(),
    check('email').notEmpty(),
    check('password').notEmpty()
  ]
}