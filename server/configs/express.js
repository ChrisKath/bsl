const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

module.exports = (app) => {
  // CORS
  app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 3600
  }))

  // Parser Body
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Logger
  app.use(morgan('dev'))

  // Passport
  require('./passport')

  // Static file
  app.use('/', express.static(path.join(__dirname, '../public')))

  // Secure protocol
  app.use((req, res, next) => {
    const hostName = req.get('host')
    if (req.protocol === 'https') next()
    else res.redirect(301, `https://${hostName}${req.originalUrl}`)
  })

  // Custom Response Format
  app.use(require('./responseFormat'))
}