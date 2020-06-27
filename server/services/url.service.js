const { Op, urls, tagging } = require('../configs/databases')
const { createKeyCode } = require('../helpers/token.helper')

const methods = {
  /**
   * Generate keyCode
   * 
   * @returns {string}
   */
  runKeyCode: async () => {
    const keyCode = createKeyCode()
    const hasKeyCode = await methods.hasKeyCode(keyCode)
    if (hasKeyCode > 0) {
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
   * @param {number} id
   * @param {array} tags
   */
  addTagging: async (id, tags) => {
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
  },

  /**
   * Display a listing of the resource by filters.
   * 
   * @param {Request} req
   */
  filters: (req) => {
    const filterOptions = {
      enabled: req.body.enabled,
      createdAt: {
        // WHERE `createdAt` BETWEEN [DATE-START, DATE-END]
        [Op.between]: req.body.createdAt
      }
    }

    if (req.body.expiry) {
      // WHERE `expiry` <= NOW()
      filterOptions.expiry = { [Op.lte]: new Date() }
    } else {
      filterOptions.expiry = {
        // WHERE `expiry` >= NOW() OR `expiry` IS NULL
        [Op.or]: { [Op.gte]: new Date(), [Op.is]: null }
      }
    }

    if (req.body.createdBy) {
      filterOptions.createdBy = req.body.createdBy
    }

    return filterOptions
  }
}

module.exports = methods