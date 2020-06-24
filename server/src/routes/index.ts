import express from 'express'
import controllers from '../controllers/main.controller'
import configs from '../configs/app'
const router: any = express.Router()

// APIs
router.use(`/api/v${configs.apiVersion}`, require('./api/index'))

// Gatter storage file
router.get('/f/:dest/:name', controllers.file)
router.get('/d3m0', controllers.d3m0)

// Any url endpoint
router.get('*', controllers.index)

export default router