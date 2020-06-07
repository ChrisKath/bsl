const { secretKey, tokenExpDays } = require('../configs/app')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const methods = {
  // Generate JWT
  generateJWT (input) {
    const token = jwt.sign({
      id: input.id,
      username: input.username
    }, secretKey, {
      expiresIn: `${tokenExpDays} days`
    })
    
    return {
      status: Boolean(token),
      accessToken: token,
      expired: moment().add({ day: tokenExpDays }).format()
    }
  }
}


module.exports = { ...methods }