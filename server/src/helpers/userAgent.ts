import { is, parse } from 'useragent'
import { Request } from 'express'

/**
 * User agent parser
 * 
 * @param {Request} req
 */
export function userAgent (req: Request): any {
  const data = req.headers['user-agent']

  return {
    is: (type?: string) => {
      const result: any = is(data)
      return type ? result[type] : result
    },

    os: (family: string) => {
      const { os } = parse(data)
      return (os.family === family)
    },

    parse: () => {
      return parse(data)
    }
  }
}