import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

export default (app: any) => {
  // CORS
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    preflightContinue: true,
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