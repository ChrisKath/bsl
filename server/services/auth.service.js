const { users } = require('../configs/databases')

const methods = {
  /**
   * Check SSO is Activated.
   * 
   * @param {Request} req
   */
  ssoAccessData: (req) => {
    if (req.sso) {
      // verify sso {domain} is "destinyth", {name} as employeeCode
      const { user } = req.sso
      if (user.domain.toLowerCase() === 'destinyth' && !isNaN(user.name)) {
        return {
          employeeCode: parseInt(user.name),
          employeeName: user.adUser.name[0],
          nickName    : user.displayName.split('-')[0].trim(),
          accountName : user.adUser.userPrincipalName[0],
          email       : user.adUser.proxyAddresses[0].split(':')[1],
          jobTitle    : user.adUser.title[0],
          department  : user.adUser.department[0],
          company     : user.adUser.company[0],
          officeName  : user.adUser.physicalDeliveryOfficeName[0]
        }
      } else {
        return false
      }
    } else {
      return false
    }
  },

  /**
   * Update user data into system db.
   * 
   * @param {Request} req
   * @param {object} user
   */
  ssoAssignData: async (req, user) => {
    const data = ('employeeCode' in req) ? req : methods.ssoAccessData(req)
    const store = {}

    if (!data) return false

    if (!user.employeeName) {
      store.employeeName = data.employeeName
    }

    if (!user.username) {
      store.username = data.nickName
    }

    if (Object.keys(store).length) {
      await users.update(store, { where: { id: user.id } })
    }
  }
}

module.exports = methods