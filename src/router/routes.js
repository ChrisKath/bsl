const login = () => import('~/components/guest/login')
const reset = () => import('~/components/guest/reset')

const dashboard = () => import('~/components/auth/dashboard')
const watch     = () => import('~/components/auth/watch')
const tag       = () => import('~/components/auth/tag')

const panel     = () => import('~/components/auth/panel/index')
const store     = () => import('~/components/auth/panel/store')
const update    = () => import('~/components/auth/panel/update')

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
      name: 'auth.panel.id',
      path: '/manage/account/:id/edit',
      component: update
    },
    {
      name: 'auth.panel.add',
      path: '/manage/account/add',
      component: store
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
