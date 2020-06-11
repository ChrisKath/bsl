const router = require('express').Router()
const controllers = require('../../controllers/auth.controller')
const validator = require('../../validators')

router.post('/login', [validator.auth.post, validator.check], controllers.login)

module.exports = router