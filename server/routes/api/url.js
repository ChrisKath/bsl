const router = require('express').Router()
const controllers = require('../../controllers/url.controller')

router.get('/', controllers.all)

module.exports = router