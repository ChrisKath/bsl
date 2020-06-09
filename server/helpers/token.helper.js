const { appName, secretKey, tokenExpiry } = require('../configs/app')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const methods = {
  // Generate JsonWebToken.
  signToken (user) {
    const token = jwt.sign({
      iss: appName,
      sub: user.id
    }, secretKey, { expiresIn: tokenExpiry })
    
    return {
      status: Boolean(token),
      accessToken: token,
      expired: moment().add(Number(tokenExpiry[0]), tokenExpiry[1]).format()
    }
  }
}


module.exports = { ...methods }