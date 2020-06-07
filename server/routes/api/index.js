const router = require('express').Router()
const auth = require('../auth')

router.use('/auth', require('./auth'))
router.use('/users', auth.required, require('./user'))

module.exports = router