module.exports = (req, res, next) => {
  res.error = (errorMsg = '', statusCode = 500) => {
    res.status(statusCode || 500).json({
      status: statusCode,
      message: errorMsg
    })
  }

  next()
}