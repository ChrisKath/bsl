import { Request } from 'express'
import { createQueryBuilder } from 'typeorm'
import { Click, Facebook } from '../database'
import moment from 'moment'

class Service {
  /**
   * Get keyCode
   * and check router is not console panel
   * 
   * @param {string} baseUrl
   */
  public getKeyCode (baseUrl: string): string | boolean {
    const ignore: string[] = ['auth', 'dashboard', 'store', 'profile']
    baseUrl = baseUrl.split('/')[1] // GET 'www.example.com/auth/login' = 'auth'
    
    // if {baseUrl} is keyCode @return {keyCode}
    return (ignore.indexOf(baseUrl) < 0)
      ? baseUrl // as {keyCode}
      : false
  }

  /**
   * Check this Url is expired
   * 
   * @param {date} expiryDate
   */
  public isExpired (expiryDate: Date): boolean {
    return moment(expiryDate).isBefore()
  }

  /**
   * Save click logs
   * 
   * @param {number} id
   * @param {Request} req
   */
  public async saveClickLogs (id: number, req: Request): Promise<void> {
    await createQueryBuilder()
      .insert()
      .into(Click)
      .values({
        urlId       : id,
        userIp      : req.ip,
        description : req.get('User-Agent')
      })
      .execute()
  }

  /**
   * Facebook detector.
   * 
   * @param {string} url
   * @param {string} href
   */
  public async isFacebook (url: string, href: string): Promise<any> {
    const { origin, pathname }: URL = new URL(url)
    const isFB: boolean = (/(?:https?:\/\/)?(?:(?:www\.|m\.|touch\.)?(?:facebook|fb)\.(?:com|me))/i).test(origin)
    if (!isFB) return false

    // Create Variables
    const regex: any = {
      photos: /(?:photos\/)(?:.*)\/(\d*)\/(?:\/|\?.*)?/i,
      events: /(?:events\/)(\d*)(?:\/|\?)?(.*)/i,
      groups: /(?:groups\/)(\d*)(?:\/|\?)?(.*)/i,
      profile:/(?:profile\.php\?id=)(\d*)(?:\/|\?)?(.*)/i,
      pages:  /(?:pages\/|pg\/).*\-(\d*)(?:\/|\?)?(.*)/i,
      any:    /([\w\.]+)(?:\/|\?)?(.*)/i
    }
    
    const results: any = {
      package : 'com.facebook.katana',
      scheme  : 'fb',
      fallback: href
    }

    if (regex.photos.test(pathname)) {
      const match: string = pathname.match(regex.photos)[1]
      results.host = `photo/${match}`
      results.path = `photo?id=${match}`
    }
    else if (regex.events.test(pathname)) {
      const match: string = pathname.match(regex.events)[1]
      results.host = `event/${match}`
      results.path = `event?id=${match}`
    }
    else if (regex.groups.test(pathname)) {
      const match: string = pathname.match(regex.groups)[1]
      results.host = `group/${match}`
      results.path = `group?id=${match}`
    }
    else if (regex.profile.test(pathname)) {
      const match: string = pathname.match(regex.profile)[1]
      results.host = `profile/${match}`
      results.path = `profile?id=${match}`
    }
    else if (regex.pages.test(pathname)) {
      const match: string = pathname.match(regex.pages)[1]
      results.host = `page/${match}`
      results.path = `profile/${match}`
    }
    else if (regex.any.test(pathname)) {
      const fb: Facebook = await createQueryBuilder(Facebook, 'fb')
        .select(['fb.id'])
        .where('LOWER(fb.name) = :name', {
          name: String(pathname.match(regex.any)[1]).toLowerCase()
        })
        .getOne()

      if (!fb.id) return false
      results.host = `page/${fb.id}`
      results.path = `profile/${fb.id}`
    }
    else return false

    return results
  }
}

export default new Service()