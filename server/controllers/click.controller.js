const { clicks } = require('../configs/databases')

module.exports = {
  /**
   * Display a listing of the resource.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {},

  /**
   * Store a newly created resource in storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {},

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
  update: async (req, res) => {},

  /**
   * Remove the specified resource from storage.
   * 
   * @param {Request} req
   * @param {Response} res
   */
  destroy: async (req, res) => {}
}