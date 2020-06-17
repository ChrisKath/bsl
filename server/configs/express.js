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

  // Custom Response Format
  app.use(require('./responseFormat'))
}