const { users } = require('../configs/databases')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    try {
      const query = await users.findAll({
        attributes: { exclude: ['password'] },
        benchmark: true
      })
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
    try {
      // store a newly.
      const store = await urls.create({
        name      : req.body.name || req.body.username,
        email     : req.body.email,
        username  : req.body.username,
        password  : req.body.password,
        isAdmin   : req.body.isAdmin,
        createdBy : req.user.id,
        updatedBy : req.user.id
      })

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
  show: async (req, res) => {},

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    try {
      // Update storage.
      await urls.update({
        name      : req.body.name,
        email     : req.body.email,
        isAdmin   : req.body.isAdmin,
        updatedBy : req.user.id
      }, {
        where: { id: req.params.id }
      })
      
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
  destroy: async (req, res) => {}
}