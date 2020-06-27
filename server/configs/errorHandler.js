module.exports = (app, production = false) => {
  // catch 404 and forward to error handler.
  app.use((req, res, next) => {
    let error = new Error('Endpoint Not Found')
    error.status = 404
    next(error)
  })

  app.use((error, req, res, next) => {
    if (!production) console.log(error.stack)
    let statusCode = error.status || 500
    res.status(statusCode)
    res.json({
      error: {
        status: statusCode,
        message: error.message,
      }
    })
  })
}