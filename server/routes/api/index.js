const router = require('express').Router()
const passport = require('passport')
const Authenticate = passport.authenticate('jwt', { session: false })

router.use('/auth', require('./auth'))
router.use('/user', Authenticate, require('./user'))
router.use('/url',  Authenticate, require('./url'))
router.use('/tag',  Authenticate, require('./tag'))
router.use('/icon', Authenticate, require('./icon'))

module.exports = router