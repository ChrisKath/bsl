const { urls } = require('../configs/databases')
const service = require('../services/main.service')
const path = require('path')
const fs = require('fs')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    const keyCode = service.getKeyCode(req.path)

    if (keyCode) {
      try {
        const query = await urls.findOne({
          attributes: ['id', 'href', 'expiry', 'redirect'],
          where: {
            key: keyCode,
            enabled: true
          }
        })

        // if {keyCode} not match
        if (!query) {
          return res.sendFile(path.join(__dirname, '../public/404.html'))
        }

        // save clicked-log
        service.clickLog(query.id, req)
        
        // if this Url is expired, redirect to setting value
        if (query.expiry && service.isExpired(query.expiry)) {
          if (query.redirect) {
            return res.redirect(query.redirect)
          } else {
            return res.sendFile(path.join(__dirname, '../public/404.html'))
          }
        }

        // redirect to endpoint-target
        res.redirect(query.href)
      } catch (error) {
        res.error(error.message, error.status)
      }
    } else {
      // response to console panel.
      res.sendFile(path.join(__dirname, '../public/index.html'))
    }
  },

  /**
   * Gatter storage file.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  file: (req, res) => {
    try {
      const pathFile = path.join(__dirname, `../storage/${req.params.dest}/${req.params.name}`)
      const encode = fs.readFileSync(pathFile).toString('base64')
      const buffer = Buffer.from(encode, 'base64')
      
      res.contentType('image/jpeg')
      res.send(buffer)
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}