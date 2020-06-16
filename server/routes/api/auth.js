const router = require('express').Router()
const passport = require('passport')
const controllers = require('../../controllers/auth.controller')
const Auth = passport.authenticate('jwt', { session: false })

router.post('/login', controllers.login)
router.get('/me', Auth, controllers.me)
router.get('/refreshToken', Auth, controllers.refresh)

module.exports = router