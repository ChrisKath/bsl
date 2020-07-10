import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'index',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "index" */ '@/views/Index/Index.vue')
  },

  {
    path: '/auth',
    name: 'auth',
    meta: { requiresAuth: false },
    redirect: { name: 'auth.login' },
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        meta: {
          requiresAuth: false,
          title: 'Security Rules'
        },
        component: () => import(/* webpackChunkName: "auth.login" */ '@/views/Auth/Routers/Login.vue')
      },
      {
        path: 'password',
        name: 'auth.password',
        meta: {
          requiresAuth: false,
          title: 'Setting your new password'
        },
        component: () => import(/* webpackChunkName: "auth.password" */ '@/views/Auth/Routers/Password.vue')
      }
    ]
  },

  {
    path: '/warning',
    name: 'warning',
    meta: {
      requiresAuth: false,
      title: 'You\'re using an UNSUPPORTED browser from developer'
    },
    component: () => import(/* webpackChunkName: "warning" */ '@/views/Warning/Index.vue')
  }
]

export default routes