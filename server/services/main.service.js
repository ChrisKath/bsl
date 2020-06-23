const { Sequelize, clicks, facebook } = require('../configs/databases')
// const useragent = require('useragent')
const moment = require('moment')

module.exports = {
  /**
   * Get keyCode
   * and check router is not console panel
   * 
   * @param {string} baseUrl
   */
  getKeyCode: (baseUrl) => {
    const ignore = ['auth', 'dashboard', 'store', 'profile']
    baseUrl = baseUrl.split('/')[1] // GET 'www.example.com/auth/login' = 'auth'
    
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
    clicks.create({
      urlId: id,
      userIp: req.ip,
      description: req.get('User-Agent')
    })
  },

  /**
   * Facebook detector.
   * 
   * @param {string} url
   * @param {string} href
   */
  isFacebook: async (url, href) => {
    const { origin, pathname } = new URL(url)
    const isFB = (/(?:https?:\/\/)?(?:(?:www\.|m\.|touch\.)?(?:facebook|fb)\.(?:com|me))/i).test(origin)
    if (!isFB) return false

    // Create Variables
    const regex = {
      photos: /(?:photos\/)(?:.*)\/(\d*)\/(?:\/|\?.*)?/i,
      events: /(?:events\/)(\d*)(?:\/|\?)?(.*)/i,
      groups: /(?:groups\/)(\d*)(?:\/|\?)?(.*)/i,
      profile:/(?:profile\.php\?id=)(\d*)(?:\/|\?)?(.*)/i,
      pages:  /(?:pages\/|pg\/).*\-(\d*)(?:\/|\?)?(.*)/i,
      any:    /([\w\.]+)(?:\/|\?)?(.*)/i
    }
    
    const results = {
      package : 'com.facebook.katana',
      scheme  : 'fb',
      fallback: href
    }

    if (regex.photos.test(pathname)) {
      const match = pathname.match(regex.photos)[1]
      results.host = `photo/${match}`
      results.path = `photo?id=${match}`
    }
    else if (regex.events.test(pathname)) {
      const match = pathname.match(regex.events)[1]
      results.host = `event/${match}`
      results.path = `event?id=${match}`
    }
    else if (regex.groups.test(pathname)) {
      const match = pathname.match(regex.groups)[1]
      results.host = `group/${match}`
      results.path = `group?id=${match}`
    }
    else if (regex.profile.test(pathname)) {
      const match = pathname.match(regex.profile)[1]
      results.host = `profile/${match}`
      results.path = `profile?id=${match}`
    }
    else if (regex.pages.test(pathname)) {
      const match = pathname.match(regex.pages)[1]
      results.host = `page/${match}`
      results.path = `profile/${match}`
    }
    else if (regex.any.test(pathname)) {
      const fb = await facebook.findOne({ attributes: ['id'],
        where: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('name')),
          Sequelize.fn('lower', pathname.match(regex.any)[1])
        )
      })

      if (!fb.id) return false
      results.host = `page/${fb.id}`
      results.path = `profile/${fb.id}`
    }
    else return false

    return results
  }
}