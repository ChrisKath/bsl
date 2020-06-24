import { is, parse } from 'useragent'

/**
 * User agent parser
 * 
 * @param {Request} req
 */
export default (req: any) => {
  const data: any = req.headers['user-agent']

  return {
    is: (type: string = ''): any => {
      return type ? is(data)[type] : is(data)
    },

    os: (family: string): boolean => {
      const { os }: any = parse(data)
      return (os.family === family)
    },

    parse: (): any => {
      return parse(data)
    }
  }
}