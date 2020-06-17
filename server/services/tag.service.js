const { tags } = require('../configs/databases')

const methods = {
  /**
   * Check {tgaName} already exists
   * 
   * @param {string} tgaName
   * @returns {boolean}
   */
  hasTagName: async (tgaName) => {
    const result = await tags.count({
      where: {
        name: tgaName
      }
    })

    return result > 0
  }
}

module.exports = methods