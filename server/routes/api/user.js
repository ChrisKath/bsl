const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const auth = require('../auth')
const validator = require('../../validators')

router.get('/', controllers.all)
// router.get('/:id', [validator.check], controllers.onGetById)
// router.get('/', [validator.user.get, validator.check], auth.required, controllers.onGetAll)
// router.get('/f/:id', auth.required, controllers.onGetById)

module.exports = router