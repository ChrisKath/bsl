module.exports = (req, res, next) => {
  res.error = (errorMsg = '', statusCode = 500) => {
    res.status(statusCode || 500).json({
      error: {
        status: statusCode,
        message: errorMsg
      }
    })
  }

  next()
}