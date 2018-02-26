const login = () => import('~/components/guest/login')
const reset = () => import('~/components/guest/reset')

const dashboard   = () => import('~/components/auth/dashboard')
const watchShow   = () => import('~/components/auth/watch/index')
const watchStore  = () => import('~/components/auth/watch/store')
const panel       = () => import('~/components/auth/panel/index')
const panelStore  = () => import('~/components/auth/panel/store')
const tag         = () => import('~/components/auth/tag')

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
      name: 'auth.watch',
      path: '/watch/:key',
      component: watchShow
    },
    {
      name: 'auth.watch.store',
      path: '/watch/:key/:type',
      component: watchStore
    },
    {
      name: 'auth.tag',
      path: '/manage/tags',
      component: tag
    },
    {
      name: 'auth.panel',
      path: '/manage/accounts',
      component: panel
    },
    {
      name: 'auth.panel.store',
      path: '/manage/account/:type',
      component: panelStore
    },
    {
      name: 'auth.panel.edit',
      path: '/manage/account/:key/:type',
      component: panelStore
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
      path: '/password/reset/:passive',
      component: reset
    }
  ])
]

/**
 * @param  {String|Function} middleware
 * @param  {Array} routes
 * @return {Array}
**/
function middleware (middleware, routes) {
  routes.forEach(route =>
    (route.middleware || (route.middleware = [])).unshift(middleware)
  )
  return routes
}
