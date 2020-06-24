import configs from './configs/app'
import expressHandler from './configs/express'
import errorHandler from './configs/errorHandler'
import express from 'express'
import https from 'https'
import fs from 'fs'

// Initialize Application
const app: any = express()

// Express Configs
expressHandler(app)

// Middleware
require('./configs/middleware')

// Error handler
errorHandler(configs.isProduction, app)

// Routes
app.use(require('./routes'))

// Start Server
if (configs.isProduction) {
  let key: any  = fs.readFileSync('./storage/key.pem', 'utf8')
  let cert: any = fs.readFileSync('./storage/cert.pem', 'utf8')
  https.createServer({ key, cert }, app).listen(configs.port)
} else {
  app.listen(configs.port)
}