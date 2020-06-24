export default (req: any, res: any, next: any): void => {
  res.error = (errorMsg: string = '', statusCode: number = 500) => {
    res.status(statusCode || 500).json({
      error: {
        status: statusCode,
        message: errorMsg
      }
    })
  }

  next()
}