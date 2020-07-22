import { getRepository } from 'typeorm'
import Tag from '../database/entity/tag'

class Service {
  /**
   * Check {tgaName} already exists
   * 
   * @param {string} tgaName
   * @returns {boolean}
   */
  public async hasTagName (tgaName: string): Promise<boolean> {
    const query: number = await getRepository(Tag)
      .createQueryBuilder('tag')
      .where('tag.name = :value', { value: tgaName })
      .getCount()

    return query > 0
  }
}

export default new Service()