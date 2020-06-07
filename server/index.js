const config = require('./configs/app')
const app = require('express')()

// Express Configs.
require('./configs/express')(app)

// Middleware.
require('./configs/middleware')

// Routes.
app.use(require('./routes'))

// Error handler.
require('./configs/errorHandler')(config.isProduction, app)

// Start Server.
app.listen(config.port, () => {
  console.log(`🚀 Server is running on port: ${config.port}`)
})