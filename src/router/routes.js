const Welcome = () => import('~/pages/welcome')

export default [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },

  // Guest routes.
  ...middleware('guest', [
    {
      path: '/login',
      name: 'login',
      component: Welcome
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
  console.log(routes)
  return routes
}
