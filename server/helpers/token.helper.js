const { appName, secretKey, keyLength, tokenExpiry } = require('../configs/app')
const jwt = require('jsonwebtoken')
const moment = require('moment')

module.exports = {
  /**
   * Generate Json Web Token.
   * 
   * @param {object} user
   */
  createToken: (user) => {
    const token = jwt.sign({
      iss: appName,
      sub: user.id
    }, secretKey, { expiresIn: tokenExpiry })
    
    return {
      status: Boolean(token),
      accessToken: token,
      expired: moment().add(Number(tokenExpiry[0]), tokenExpiry[1]).format()
    }
  },

  /**
   * Create random keyCode generator.
   */
  createKeyCode: () => {
    return Math.random()
      .toString(36)
      .substr(2, keyLength)
  }
}