const router = require('express').Router()
const passport = require('passport')
const controllers = require('../../controllers/auth.controller')
const { avatar } = require('../../storage')
const sso = require('../../configs/sso')
const Auth = passport.authenticate('jwt', { session: false })

router.post('/login', controllers.login)
router.get('/sso', sso.auth(), controllers.sso)
router.get('/me', Auth, controllers.me)
router.get('/refreshToken', Auth, controllers.refresh)
router.post('/profile', [Auth, avatar.single('avatar')], controllers.profile)

module.exports = router