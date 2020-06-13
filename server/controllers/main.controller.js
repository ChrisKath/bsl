const { urls } = require('../configs/databases')
const service = require('../services/main.service')
const path = require('path')

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
          where: { key: keyCode, enable: true  }
        })

        // save clicked-log
        service.clickLog(query.id, req)
        
        // if this Url is expired, redirect to setting value
        if (query.expiry && service.isExpired(query.expiry)) {
          if (query.redirect) {
            res.redirect(query.redirect)
          } else {
            res.sendFile(path.join(__dirname, '../public/404.html'))
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
  }
}