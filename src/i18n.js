import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '~/locale/lang.all'

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  messages,
  locale: 'ja-JP',
  // locale: navigator.language || 'en-US',
  fallbackLocale: 'en-US'
})
document.querySelector('html')
  .setAttribute('lang', i18n.locale)

Vue.prototype.$lang = {
  take (lang) {
    if (!lang) return
    i18n.locale = lang
    document.querySelector('html')
      .setAttribute('lang', lang)
  }
}

export default i18n
