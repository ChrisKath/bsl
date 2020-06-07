const router = require('express').Router()
const { apiVersion } = require('../configs/app')

router.use(`/api/v${apiVersion}`, require('./api/index'))

module.exports = router