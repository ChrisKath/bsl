import { getConnection, getRepository } from 'typeorm'
import { createKeyCode } from '../helpers/token'
import { Url, Tagging } from '../database'

class Service {
  /**
   * Generate keyCode
   * 
   * @returns {string}
   */
  public async runKeyCode (): Promise<string> {
    const keyCode: string = createKeyCode()
    const hasKeyCode = await this.hasKeyCode(keyCode)
    if (hasKeyCode) {
      this.runKeyCode()
    } else {
      return keyCode
    }
  }

  /**
   * Check {key} already exist
   * 
   * @param {string} keyCode
   * @returns {boolean}
   */
  public async hasKeyCode (keyCode: string): Promise<boolean> {
    const query: number = await getRepository(Url)
      .createQueryBuilder('url')
      .where('url.key = :value', { value: keyCode })
      .getCount()

    return query > 0
  }

  /**
   * Check {href} already exist
   * 
   * @param {string} originUrl
   * @returns {boolean}
   */
  public async hasOriginUrl (originUrl: string): Promise<boolean> {
    const query: number = await getRepository(Url)
      .createQueryBuilder('url')
      .where('url.href = :value', { value: originUrl })
      .getCount()

    return query > 0
  }

  /**
   * Insert tags belongsTo URL
   * 
   * @param {number} id
   * @param {array} tags
   */
  public async addTagging (id: number, tags: any[]): Promise<void> {
    // Delete all rows match.
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Tagging)
      .where('urlId = :value', { value: id })
      .execute()

    if (tags.length) {
      // map tagging.
      const rows: any[] = tags.map((tag: number): any => ({
        urlId: id,
        tagId: tag
      }))
      
      // Insert newly tags.
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tagging)
        .values(rows)
        .execute()
    }
  }
}

export default new Service()