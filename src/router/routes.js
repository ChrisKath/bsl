const login = () => import('~/components/guest/login')
const reset = () => import('~/components/guest/reset')

const watch     = () => import('~/components/auth/watch')
const dashboard = () => import('~/components/auth/dashboard')

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
      name: 'auth.bslink',
      path: '/watch/:key',
      component: watch
    },
    {name: 'auth.logout', path: '/logout'}
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
