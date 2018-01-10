const AuthDashboard = () => import('Comp/auth/dashboard')
const GuestLogin = () => import('Comp/guest/login')

export default [
  {path: '*', redirect: '/'},
  {path: '/', redirect: {name: 'auth.main'}},
  ...middleware('auth', [
    {
      name: 'auth.main',
      path: '/dashboard',
      component: AuthDashboard
    }
  ]),
  ...middleware('guest', [
    {
      name: 'guest.login',
      path: '/guest/login',
      component: GuestLogin
    }
  ])
]

/**
 * @param  {String|Function} middleware
 * @param  {Array} routes
 * @return {Array}
 */
function middleware (middleware, routes) {
  routes.forEach(route =>
    (route.middleware || (route.middleware = [])).unshift(middleware)
  )
  return routes
}
