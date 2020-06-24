import { check } from 'express-validator'

export default {
  login: [
    check('username')
      .notEmpty()
      .withMessage('{username} is required')
  ]
}