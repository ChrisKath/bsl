const Clicks = require('../models/Click')
const moment = require('moment')

module.exports = {
  /**
   * Get keyCode
   * and check router is not console panel
   * 
   * @param {string} pathName
   */
  getKeyCode: (pathName) => {
    const ignore = ['auth', 'dashboard', 'store', 'profile']
    const baseUrl = pathName.split('/')[1] // GET 'www.example.com/auth/login' = 'auth'
    
    // if {baseUrl} is keyCode @return {keyCode}
    return (ignore.indexOf(baseUrl) < 0)
      ? baseUrl
      : false
  },

  /**
   * Check this Url is expired
   * 
   * @param {date} expiryDate
   */
  isExpired: (expiryDate) => {
    return moment(expiryDate).isBefore()
  },

  /**
   * Save clicked log
   * 
   * @param {number} id
   * @param {Request} req
   */
  clickLog: (id, req) => {
    Clicks.create({
      urlId: id,
      userIp: req.ip,
      description: req.get('User-Agent')
    })
  }
}