const { Sequelize, users, urls, tags, tagging, clicks } = require('../configs/databases')
const service = require('../services/url.service')
const click = require('../models/click')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    try {
      const result = await urls.findAll({
        where: { enabled: true },
        attributes: {
          exclude: ['type', 'redirect']
        },
        include: [{
          model: tags,
          attributes: ['id', 'name'],
          group: 'id',
          through: { attributes: [] },
        }],
        order: [['createdAt', 'DESC']],
        limit: 25,
        benchmark: true
      })

      res.json(result)
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
      return res.status(409).json({
        status: false,
        message: 'This URL already exists.'
      })
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
        status: true,
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
      const result = await urls.findByPk(req.params.id, {
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

      res.json(result)
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
        return res.status(409).json({
          status: false,
          message: 'This ShortKey already exists.'
        })
      }
    }

    // Check URL already exists.
    const existHref = await service.hasOriginUrl(req.body.href)
    if (existHref > 0) {
      return res.status(409).json({
        status: false,
        message: 'This URL already exists.'
      })
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
      
      res.json({
        status: true,
        message: 'Update success.'
      })
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
      
      res.json({
        status: true,
        message: 'Remove success.'
      })
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}