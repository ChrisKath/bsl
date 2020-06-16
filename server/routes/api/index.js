const router = require('express').Router()
const passport = require('passport')
const Auth = passport.authenticate('jwt', { session: false })

router.use('/auth', require('./auth'))
router.use('/users', Auth, require('./user'))
router.use('/urls', Auth, require('./url'))

module.exports = router