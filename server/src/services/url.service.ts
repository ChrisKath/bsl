import { Op, urls, tagging } from '../configs/databases'
import { createKeyCode } from '../helpers/token.helper'

const methods: any = {
  /**
   * Generate keyCode
   * 
   * @returns {string}
   */
  runKeyCode: (): string | void => {
    const keyCode: string = createKeyCode()
    if (methods.hasKeyCode(keyCode)) {
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
  hasKeyCode: async (keyCode: string): Promise<boolean> => {
    const result: number = await urls.count({
      where: { key: keyCode }
    })

    return result > 0
  },

  /**
   * Check {href} already exist
   * 
   * @param {string} originUrl
   * @returns {boolean}
   */
  hasOriginUrl: async (originUrl: string): Promise<boolean> => {
    const result: number = await urls.count({
      where: { href: originUrl }
    })

    return result > 0
  },

  /**
   * Insert tags belongsTo URL
   * 
   * @param {number} id
   * @param {array} tags
   */
  insertTags: async (id: number, tags: Array<any>): Promise<void> => {
    // Delete all rows match.
    await tagging.destroy({ where: { urlId: id } })

    if (tags.length) {
      // map tagging.
      const rows: Array<any> = tags.map((tag: any): any => ({
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
    const where = {
      enabled: req.body.enabled,
      createdAt: {
        // WHERE `createdAt` BETWEEN [DATE-START, DATE-END]
        [Op.between]: req.body.createdAt
      }
    }

    if (req.body.expiry) {
      // WHERE `expiry` <= NOW()
      where.expiry = { [Op.lte]: new Date() }
    } else {
      where.expiry = {
        // WHERE `expiry` >= NOW() OR `expiry` IS NULL
        [Op.or]: { [Op.gte]: new Date(), [Op.is]: null }
      }
    }

    if (req.body.createdBy) {
      where.createdBy = req.body.createdBy
    }

    return where
  }
}

module.exports = methods