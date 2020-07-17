const router = require('express').Router()
const passport = require('passport')
const { sso } = require('node-expose-sspi')
const controllers = require('../../controllers/auth.controller')
const { avatar } = require('../../storage')

// Middleware variable.
const Authenticate = passport.authenticate('jwt', { session: false })
const SingleSignOn = sso.auth({ useGroups: false })
const AvatarFile = avatar.single('avatar')

router.post('/login', controllers.login)
router.get('/sso', SingleSignOn, controllers.sso)
router.get('/me', Authenticate, controllers.me)
router.get('/refreshToken', Authenticate, controllers.refresh)
router.post('/profile', [Authenticate, AvatarFile], controllers.profile)

module.exports = router