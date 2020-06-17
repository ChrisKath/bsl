const { urls, tagging } = require('../configs/databases')
const { createKeyCode } = require('../helpers/token.helper')

const methods = {
  /**
   * Generate keyCode
   * 
   * @returns {string}
   */
  runKeyCode: () => {
    const keyCode = createKeyCode()
    if (methods.hasKeyCode(keyCode) > 0) {
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
    const result = await urls.count({
      where: {
        key: keyCode
      }
    })

    return result
  },

  /**
   * Check {href} already exist
   * 
   * @param {string} originUrl
   * @returns {boolean}
   */
  hasOriginUrl: async (originUrl) => {
    const result = await urls.count({
      where: {
        href: originUrl
      }
    })

    return result
  },

  /**
   * Insert tags belongsTo URL
   * 
   * @param {number} id,
   * @param {array} tags
   */
  insertTags: async (id, tags) => {
    // Delete all rows match.
    await tagging.destroy({ where: { urlId: id } })

    if (tags.length) {
      // map tagging.
      const rows = tags.map((tag) => ({
        urlId: id,
        tagId: tag
      }))
      
      // Insert newly tags.
      tagging.bulkCreate(rows)
    }
  }
}

module.exports = methods