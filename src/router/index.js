import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const routeMiddleware = resolveMiddleware(
  require.context('./middleware', false, /.*\.js$/)
)

const router = touch()

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function touch () {
  const router = new Router({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    base: __dirname,
    fallback: false,
    scrollBehavior,
    routes: routes.map(beforeEnter)
  })

  // Register before guard.
  router.beforeEach((to, from, next) => {
    router.app.$nextTick(() => router.app.$loading.start())
    next()
  })

  // Register after hook.
  router.afterEach(() => {
    router.app.$nextTick(() => router.app.$loading.finish())
  })

  return router
}

/**
 * Add beforeEnter guard to the route.
 *
 * @param {Object} route
 * @param {Object}
 */
function beforeEnter (route) {
  if (route.children) {
    route.children.forEach(beforeEnter)
  }

  if (!route.middleware) {
    return route
  }

  route.beforeEnter = (...args) => {
    if (!Array.isArray(route.middleware)) {
      route.middleware = [route.middleware]
    }

    route.middleware.forEach(middleware => {
      if (typeof middleware === 'function') {
        middleware(...args)
      } else if (routeMiddleware[middleware]) {
        routeMiddleware[middleware](...args)
      } else {
        throw Error(`Undefined middleware [${middleware}]`)
      }
    })
  }

  return route
}

/**
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) return { selector: to.hash }

  const [component] = router.getMatchedComponents({ ...to }).slice(-1)
  if (component && component.scrollToTop === false) return {}

  return { x: 0, y: 0 }
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
