const router = require('express').Router()
const controllers = require('../../controllers/url.controller')

router.get('/', controllers.index)
router.post('/create', controllers.create)
router.get('/:id(\d)', controllers.show)
router.patch('/:id(\d)', controllers.update)
router.delete('/:id(\d)', controllers.destroy)
router.get('/statistics', controllers.statistic)

module.exports = router