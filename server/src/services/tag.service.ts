import { tags } from '../configs/databases'

const methods: any = {
  /**
   * Check {tgaName} already exists
   * 
   * @param {string} tgaName
   * @returns {boolean}
   */
  hasTagName: async (tgaName: string): Promise<boolean> => {
    const result: any = await tags.count({
      where: {
        name: tgaName
      }
    })

    return result > 0
  }
}

export default methods