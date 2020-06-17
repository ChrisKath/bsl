const router = require('express').Router()
const controllers = require('../../controllers/tag.controller')

router.get('/', controllers.index)
router.post('/create', controllers.create)
router.get('/:id', controllers.show)
router.patch('/:id', controllers.update)
router.delete('/:id', controllers.destroy)

module.exports = router