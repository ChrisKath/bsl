// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import lodash from 'lodash'
import moment from 'vue-moment'
import JWToken from 'json-web-token'
import clipboard from 'vue-clipboard2'

import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'

// Call Component.
import IRowHead from '~/components/UIComponent/rowHead'
import ILanguages from '~/components/UIComponent/Other/language'
import IInputGroup from '~/components/UIComponent/Other/inputgroup'

// Call Style.
import '~/assets/style/iView/index.less'
import '~/assets/core.less'

Vue.use(iView)
Vue.use(moment)
Vue.use(clipboard)

Vue.prototype.$lodash = lodash
Vue.prototype.$jwt    = JWToken
Vue.prototype.$uri    = 'tap.co/' // `${location.host}/`
Vue.prototype.$typeA  = 'TYPE.Authentication'
Vue.prototype.$secret = 'H-I-M-I-T-S-U-K-E-N' // 秘密鍵

Vue.component('RowHead', IRowHead)
Vue.component('Languages', ILanguages)
Vue.component('InputGroup', IInputGroup)

Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
