const router = require('express').Router()
const controllers = require('../../controllers/user.controller')

router.get('/', controllers.index)

module.exports = router