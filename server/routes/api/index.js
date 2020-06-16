const router = require('express').Router()
const passport = require('passport')
const Auth = passport.authenticate('jwt', { session: false })

router.use('/auth', require('./auth'))
router.use('/user', Auth, require('./user'))
router.use('/url', Auth, require('./url'))

module.exports = router