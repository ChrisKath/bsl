const dashboard = () => import('Comp/auth/dashboard')
const login = () => import('Comp/guest/login')
const reset = () => import('Comp/guest/reset')

export default [
  {path: '*', redirect: '/'},
  {path: '/', redirect: {name: 'auth.main'}},

  ...middleware('auth', [
    {
      name: 'auth.main',
      path: '/dashboard',
      component: dashboard
    },
    {
      name: 'auth.logout',
      path: '/logout'
    }
  ]),

  ...middleware('guest', [
    {
      name: 'guest.login',
      path: '/login',
      component: login
    },
    {
      name: 'guest.reset',
      path: '/password/reset',
      component: reset
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
