const { isProd, port } = require('./configs/app')
const app = require('express')()
const https = require('https')
const http = require('http')
const fs = require('fs')

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(isProd, app)

// Start Server
http.createServer(app).listen(isProd ? 80 : port)
https
  .createServer({
    key : fs.readFileSync('./helpers/key.pem', 'utf8'),
    cert: fs.readFileSync('./helpers/cert.pem', 'utf8'),
    passphrase: ''
  }, app)
  .listen(isProd ? 443 : 3001)