import Vue from 'vue'
import VueI18n from 'vue-i18n'
import moment from 'vue-moment'
import messages from '~/locale/lang.all'

Vue.use(moment)
Vue.use(VueI18n)

// Create VueI18n instance with options
const internationalization = new VueI18n({
  messages,
  locale: 'ja-JP',
  // locale: navigator.language || 'en-US',
  fallbackLocale: 'en-US'
})

document.querySelector('html')
  .setAttribute('lang', internationalization.locale)

Vue.prototype.$lang = {
  take (lang) {
    if (!lang) return
    internationalization.locale = lang
    document.querySelector('html')
      .setAttribute('lang', lang)
  }
}

export default internationalization
