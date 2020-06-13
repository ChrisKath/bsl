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
        attributes: { exclude: ['password'] }
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
  create: (req, res) => {},

  /**
   * Display the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  show: (req, res) => {},

  /**
   * Show the form for editing the specified resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  edit: (req, res) => {},

  /**
   * Update the specified resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {},

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  destroy: (req, res) => {}
}