import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { getCookie } from 'tiny-cookie'
import config from '@/configs/app'

Vue.use(Router)
const router: any = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 })
})

/**
 * Signature of all route guards:
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 * 
 * See http://router.vuejs.org/en/advanced/navigation-guards.html
 * for more details.
 */
router.beforeEach((to: any, from: any, next: Function): void => {
  const requiresAuth: boolean = to.matched.some((record: any) => record.meta.requiresAuth)
  const token: any = getCookie(config.APP_AUTH)

  if (requiresAuth) {
    if (token) next()
    else next({ name: 'auth.login' })
  } else {
    next()
  }
})

// Global After Hooks
// router.afterEach((to: any): void => {
//   pageTitle(to.meta)
// })

export default router