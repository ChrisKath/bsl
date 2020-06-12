const { createKeyCode } = require('../helpers/token.helper')
const Urls = require('../models/Url')
const Tagging = require('../models/Tagging')

const methods = {
  /**
   * Generate keyCode
   * 
   * @returns {string}
   */
  runKeyCode: () => {
    const keyCode = createKeyCode()
    const check = methods.hasKeyCode(keyCode)
    if (check > 0) {
      methods.runKeyCode()
    } else {
      return keyCode
    }
  },

  /**
   * Check {key} already exist
   * 
   * @param {string} keyCode
   * @returns {boolean}
   */
  hasKeyCode: async (keyCode) => {
    const query = await Urls.count({
      where: {
        key: keyCode
      }
    })
    return query
  },

  /**
   * Check {href} already exist
   * 
   * @param {string} originUrl
   * @returns {boolean}
   */
  hasOriginUrl: async (originUrl) => {
    const query = await Urls.count({
      where: {
        href: originUrl
      }
    })
    return query
  },

  /**
   * Insert tags belongsTo URL
   * 
   * @param {number} id,
   * @param {array} tags
   */
  insertTags: async (id, tags) => {
    // Delete all rows match.
    await Tagging.destroy({ where: { urlId: id } })

    if (tags.length) {
      // map tagging.
      const rows = tags.map((tag) => ({
        urlId: id,
        tagId: tag
      }))
      
      // Insert newly tags.
      Tagging.bulkCreate(rows)
    }
  }
}

module.exports = methods