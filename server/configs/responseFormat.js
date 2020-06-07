module.exports = (request, response, next) => {
  response.success = (data = '', statusCode = 200) => {
    response.status(statusCode || 200).send(data)
  }

  response.error = (errorMsg = '', statusCode = 500) => {
    response.status(statusCode || 500).send({
      status: statusCode,
      message: errorMsg
    })
  }

  next()
}