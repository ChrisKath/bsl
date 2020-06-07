const jwt = require('express-jwt')
const { secretKey } = require('../configs/app')

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

module.exports = {
  required: jwt({
    secret: secretKey,
    getToken: getTokenFromHeader
  }),
  
  optional: jwt({
    secret: secretKey,
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}