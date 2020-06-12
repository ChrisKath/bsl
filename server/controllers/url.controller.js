const Sequelize = require('sequelize')
const service = require('../services/url.service')
const Urls = require('../models/Url')
const Tags = require('../models/Tag')
const Clicks = require('../models/Click')
const Tagging = require('../models/Tagging')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    try {
      const result = await Urls.findAll({
        include: [
          { model: Tags, attributes: ['id', 'name'] },
          { model: Clicks, attributes: [] }
        ],
        attributes: {
          include: [
            [Sequelize.fn('COUNT',
              Sequelize.fn('DISTINCT', Sequelize.col('Clicks.id'))
            ), 'clicks']
          ]
        },
        group: ['Tags.id'],
        order: [['createdAt', 'DESC']],
        limit: 25
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
      const store = await Urls.create({
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

      res.status(200).json({
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
      const query = await Urls.findOne({
        where: { id: req.params.id },
        include: [
          { model: Tags, attributes: ['id', 'name'] },
          { model: Clicks, attributes: [] }
        ],
        attributes: {
          include: [
            [Sequelize.fn('COUNT',
              Sequelize.fn('DISTINCT', Sequelize.col('Clicks.id'))
            ), 'clicks']
          ]
        },
        group: ['Tags.id']
      })
      
      res.status(200).json(query)
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
      await Urls.update({
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
      
      res.status(200).json({
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
      await Tagging.destroy({ where: { urlId: id } })
      await Urls.destroy({ where: { id } })
      await Clicks.destroy({ where: { id } })
      
      res.status(200).json({
        status: true,
        message: 'Remove success.'
      })
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}