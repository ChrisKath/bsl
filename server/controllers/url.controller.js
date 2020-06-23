const { Sequelize, users, urls, tags, tagging, clicks } = require('../configs/databases')
const service = require('../services/url.service')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    const filters = service.filters(req)
    const tagsFilter = {}

    if (req.body.tags.length) {
      tagsFilter.id = {
        [Sequelize.Op.in]: req.body.tags
      }
    }

    try {
      const results = await urls.findAll({
        where: filters,
        attributes: {
          exclude: ['type', 'redirect']
        },
        include: [{
          model: tags,
          where: tagsFilter,
          attributes: ['id', 'name'],
          group: 'id',
          through: { attributes: [] },
        }],
        order: [
          [Sequelize.literal('createdAt'), 'DESC']
        ],
        limit: 25,
        benchmark: true
      })

      res.json(results)
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Store a newly created resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    // Check URL already exists.
    const existHref = await service.hasOriginUrl(req.body.href)
    if (existHref > 0) {
      return res.error('This URL already exists.', 409)
    }

    // getters variable.
    const keyCode = service.runKeyCode()
    const url = new URL(req.body.href)

    try {
      // store a newly.
      const store = await urls.create({
        key       : keyCode,
        href      : req.body.href,
        title     : req.body.title || url.hostname,
        expiry    : req.body.expiry,
        redirect  : req.body.redirect,
        createdBy : req.user.id,
        updatedBy : req.user.id
      })

      // insert tags.
      service.insertTags(store.id, req.body.tags)

      res.json({
        data: store,
        message: 'Create success.'
      })
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Display the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  show: async (req, res) => {
    try {
      const url = await urls.findByPk(req.params.id, {
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('clicks.id')), 'totalClicks']],
          exclude: ['createdBy', 'updatedBy']
        },
        include: [
          { model: users, as: 'creater', attributes: ['id', 'name'] },
          { model: users, as: 'updater', attributes: ['id', 'name'] },
          { model: tags, attributes: ['id', 'name'], through: { attributes: [] } },
          { model: clicks, attributes: [] }
        ],
        group: 'tags.id',
        benchmark: true
      })

      res.json(url)
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    // Check KeyCode already exists.
    if (req.body.key) {
      const existKey = await service.hasKeyCode(req.body.key)
      if (existKey > 0) {
        return res.error('This ShortKey already exists.', 409)
      }
    }

    // Check URL already exists.
    const existHref = await service.hasOriginUrl(req.body.href)
    if (existHref > 0) {
      return res.error('This URL already exists.', 409)
    }

    // getters variable.
    const keyCode = req.body.key || service.runKeyCode()

    try {
      // Update storage.
      await urls.update({
        key       : keyCode,
        href      : req.body.href,
        title     : req.body.title,
        expiry    : req.body.expiry,
        redirect  : req.body.redirect,
        updatedBy : req.user.id
      }, {
        where: { id: req.params.id }
      })

      // insert tags.
      service.insertTags(req.params.id, req.body.tags)
      
      res.json({ message: 'Update success.' })
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  destroy: async (req, res) => {
    const id = req.params.id

    try {
      await tagging.destroy({ where: { urlId: id } })
      await urls.destroy({ where: { id } })
      await clicks.destroy({ where: { id } })
      res.json({ message: 'Remove success.' })
    } catch (error) {
      res.error(error.message, error.status)
    }
  },


  // ********************************************
  // *************** OTHER ROUTER ***************
  // ********************************************
  
  /**
   * Statistic clicks logs.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  statistic: async (req, res) => {
    try {
      const results = await clicks.findAll({
        include: [{
          model: urls,
          attributes: ['id', 'key', 'href', 'title']
        }],
        attributes: [
          [Sequelize.fn('COUNT', 'clicks.url_id'), 'totalClicks']
        ],
        group: ['clicks.url_id'],
        order: [
          [Sequelize.literal('totalClicks'), 'DESC']
        ],
        limit: 64,
        benchmark: true
      })

      res.json(results)
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}