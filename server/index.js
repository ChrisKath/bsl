const { production, port } = require('./configs/app')
const { readFileSync } = require('fs')
const https = require('https')
const app = require('express')()

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(app, production)

// Start Server
if (production) {
  let key = readFileSync('./storage/key.pem', 'utf8')
  let cert = readFileSync('./storage/cert.pem', 'utf8')
  https.createServer({ key, cert }, app).listen(port)
} else {
  app.listen(port)
}