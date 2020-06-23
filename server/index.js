const { isProduction, port } = require('./configs/app')
const app = require('express')()
const https = require('https')
const fs = require('fs')

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(isProduction, app)

// Start Server
if (isProduction) {
  https.createServer({
    key : fs.readFileSync('./storage/key.pem', 'utf8'),
    cert: fs.readFileSync('./storage/cert.pem', 'utf8')
  }, app).listen(port)
} else {
  app.listen(port)
}