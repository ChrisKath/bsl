// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import lodash from 'lodash'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'

// Call Style.
import 'iview/dist/styles/iview.css'
import '~/assets/core.less'

Vue.use(iView)
Vue.prototype.$lodash = lodash
Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
