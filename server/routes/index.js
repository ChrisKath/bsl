const router = require('express').Router()
const controllers = require('../controllers/main.controller')
const { apiVersion } = require('../configs/app')

// APIs
router.use(`/api/v${apiVersion}`, require('./api/index'))

// Gatter storage file
router.get('/f/:dest/:name', controllers.file)

// Any url endpoint.
router.get('*', controllers.index)

module.exports = router