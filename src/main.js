// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import VueI18n from 'vue-i18n'

// Call Languages.
import en from '~/locale/lang/en-US'
import cn from '~/locale/lang/zh-CN'
import ja from '~/locale/lang/ja-JP'
import ko from '~/locale/lang/ko-KR'
import th from '~/locale/lang/th-TH'

// Call Style.
import 'iview/dist/styles/iview.css'
import './assets/core.less'

Vue.use(VueI18n)
Vue.use(iView)

const messages = {
  'en-US': en,
  'zh-CN': cn,
  'ja-JP': ja,
  'ko-KR': ko,
  'th-TH': th
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  locale: 'ja-JP',  // set locale
  messages  // set locale messages
})
document.querySelector('html').setAttribute('lang', i18n.locale)

Vue.prototype.$lang = {
  take (lang) {
    lang = lang || 'en-US'
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
  }
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
