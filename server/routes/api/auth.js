const router = require('express').Router()
const passport = require('passport')
const multer = require('../../configs/storage')
const controllers = require('../../controllers/auth.controller')
const Auth = passport.authenticate('jwt', { session: false })

router.post('/login', controllers.login)
router.get('/me', Auth, controllers.me)
router.get('/refreshToken', Auth, controllers.refresh)
router.post('/profile', [Auth, multer.single('avatar')], controllers.profile)

module.exports = router