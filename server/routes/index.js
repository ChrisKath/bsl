const router = require('express').Router()
const path = require('path')
const { apiVersion } = require('../configs/app')

router.use(`/api/v${apiVersion}`, require('./api/index'))
router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

module.exports = router