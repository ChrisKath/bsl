import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index.vue')
  },

  {
    path: '/warning',
    name: 'warning',
    component: () => import(/* webpackChunkName: "warning" */ '@/views/Warning/Index.vue')
  }
]

export default routes