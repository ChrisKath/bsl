export default (isProduction: boolean = false, app: any): void => {
  // catch 404 and forward to error handler.
  app.use((req: any, res: any, next: any): void => {
    let error: any = new Error('Endpoint Not Found')
    error.status = 404
    next(error)
  })

  app.use((error: any, req: any, res: any, next: any): void => {
    if (!isProduction) console.log(error.stack)
    let statusCode: number = error.status || 500
    res.status(statusCode)
    res.json({
      error: {
        status: statusCode,
        message: error.message,
      }
    })
  })
}