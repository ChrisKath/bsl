// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import lodash from 'lodash'
import cookie from 'vue-cookie'
import clipboard from 'vue-clipboard2'

import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'

// Call Component.
import ILanguages from '~/components/UIComponent/Other/language'

// Call Style.
import '~/assets/style/iView/index.less'
import '~/assets/core.less'

Vue.use(iView)
Vue.use(clipboard)
Vue.prototype.$uri = 'tap.co/'
Vue.prototype.$lodash = lodash
Vue.prototype.$csrf = cookie.get('XSRF-TOKEN')

Vue.component('Languages', ILanguages)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
