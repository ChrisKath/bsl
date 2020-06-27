const { urls } = require('../configs/databases')
const service = require('../services/main.service')
const userAgent = require('../helpers/userAgent.helper')
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
    const keyCode = service.getKeyCode(req.baseUrl)

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

        // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
        // const isFacebook = await service.isFacebook(query.href)

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
    const pathFile = path.join(__dirname, `../storage/${req.params.dest}/${req.params.name}`)
    const readStream = fs.createReadStream(pathFile)

    readStream.on('error', () => {
      res.status(404).end()
    })

    readStream.on('open', () => {
      res.set('Content-Type', 'image/jpeg')
      readStream.pipe(res)
    })
  },

  /**
   * Demo test controller.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  d3m0: async (req, res) => {
    // const isAndroid = userAgent(req).os('Android') // `Android`, `iOS`
    // const isFacebook = await service.isFacebook('https://www.facebook.com/snippetsJS/photos/a.108956220490532/293276618725157/')

    res.json(process.env)
  }
}