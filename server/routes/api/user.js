const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const { user } = require('../../validators')

router.get('/', controllers.index)
router.post('/create', [user.post], controllers.create)

module.exports = router