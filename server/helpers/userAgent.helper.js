const { is, parse } = require('useragent')

/**
 * User agent parser
 * 
 * @param {Request} req
 */
module.exports = (req) => {
  const data = req.headers['user-agent']

  return {
    is: (type = false) => {
      return type ? is(data)[type] : is(data)
    },

    os: (family) => {
      const { os } = parse(data)
      return (os.family === family)
    },

    parse: () => {
      return parse(data)
    }
  }
}