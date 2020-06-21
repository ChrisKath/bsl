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
      uid: user.id,
      sub: user.employeeCode
    }, secretKey, { expiresIn: tokenExpiry })
    
    return {
      token,
      type: 'Bearer',
      expires: moment().add(Number(tokenExpiry[0]), tokenExpiry[1]).toISOString()
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