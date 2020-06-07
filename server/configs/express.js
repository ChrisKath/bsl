const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const passport = require('passport')
const path = require('path')

module.exports = async (app) => {
  // Connect MongoDB
  require('../configs/databases')

  // CORS
  app.use(cors())

  // Parser Body
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Logger
  app.use(morgan('dev'))

  // Passport
  // require('../configs/passport')

  // Static file
  app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  app.use(require('../configs/responseFormat'))
}