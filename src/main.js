// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// Plugins
// import VueTippy from 'vue-tippy'
// Vue.use(VueTippy, {
//   touchHold: true,
//   dynamicTitle: true,
//   animation: 'perspective'
// })

Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
