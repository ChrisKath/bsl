const Sequelize= require('sequelize')
const Urls = require('../models/Url')
const Tags = require('../models/Tag')
const Clicks = require('../models/Click')

const methods = {
  async all (req, res) {
    try {
      const result = await Urls.findAll({
        include: [
          { model: Tags, attributes: ['id', 'name'] },
          { model: Clicks, attributes: [] }
        ],
        attributes: {
          include: [[
            Sequelize.fn('COUNT', Sequelize.col('clicks.id')),
            'totalClick'
          ]]
        },
        group: ['Tags.id'],
        order: [
          ['createdAt', 'DESC'],
        ]
      })

      res.json(result)
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
} 

module.exports = { ...methods }