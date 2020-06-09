const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

module.exports = async (app) => {
  // CORS
  app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 3600
  }))

  // Parser Body
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Logger
  app.use(morgan('dev'))

  // Passport
  require('../configs/passport')

  // Static file
  app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  app.use(require('../configs/responseFormat'))
}