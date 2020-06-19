const { sso } = require('node-expose-sspi')

module.exports = {
  auth: () => {
    return sso.auth({
      useActiveDirectory: true,
      useGroups: false,
      useOwner: false,
      useCookies: true
    })
  }
}