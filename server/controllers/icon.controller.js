const { icons } = require('../configs/databases')
const { removeFile } = require('../storage')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    try {
      const query = await icons.findAll()
      res.json(query)
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
    const image = req.file.filename

    try {
      // store a newly.
      const store = await icons.create({
        name: req.body.name,
        image
      })

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
      const icon = await icons.findByPk(req.params.id)
      res.json(icon)
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
    const image = req.file.filename

    try {
      // Update storage.
      await icons.update({
        name: req.body.name,
        image
      }, {
        where: { id: req.params.id }
      })

      // Remove old file.
      if (req.body.image) {
        removeFile('icons', req.body.image)
      }
      
      res.json({
        data: { image },
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
    try {
      await icons.destroy({ where: { id: req.params.id } })
      removeFile('icons', req.body.image)

      res.json({ message: 'Remove success.' })
    } catch (error) {
      res.error(error.message, error.status)
    }
  }
}