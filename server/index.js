const { isProduction, port } = require('./configs/app')
const app = require('express')()

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(isProduction, app)

// Start Server
app.listen(port)