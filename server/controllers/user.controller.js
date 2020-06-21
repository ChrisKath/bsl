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
      const results = await users.findAll({
        attributes: { exclude: ['password'] },
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
    try {
      // store a newly.
      const store = await users.create({
        employeeCode  : req.body.employeeCode,
        employeeName  : req.body.employeeName,
        username      : req.body.username,
        password      : req.body.password,
        activated     : req.body.activated,
        isAdmin       : req.body.isAdmin,
        createdBy     : req.user.id,
        updatedBy     : req.user.id
      })

      delete store.password

      res.json({
        data: store,
        message: 'Create success.'
      })
    } catch (error) {
      res.error('Not allowed to use [EmployeeCode and Username] same as another account', error.status)
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
      const user = await users.findByPk(req.params.id, {
        attributes: {
          exclude: ['password']
        }
      })

      res.json(user)
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
    try {
      // Update storage.
      await users.update({
        employeeCode: req.body.employeeCode,
        employeeName: req.body.employeeName,
        username    : req.body.username,
        password    : req.body.password,
        activated   : req.body.activated,
        isAdmin     : req.body.isAdmin,
        updatedBy   : req.user.id
      }, {
        where: { id: req.params.id }
      })
      
      res.json({ message: 'Update success.' })
    } catch (error) {
      res.error('Not allowed to use [EmployeeCode and Username] same as another account', error.status)
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