import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '~/locale/lang.all'

Vue.use(VueI18n)

// Create VueI18n instance with options
const internationalization = new VueI18n({
  messages,
  fallbackLocale: 'en-US',
  locale: localStorage.getItem('TYPE.Internationalization') || navigator.language
})

Vue.prototype.$lang = {
  take (lang) {
    if (!lang) return
    localStorage.setItem('TYPE.Internationalization', lang)
    internationalization.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
  }
}

document.querySelector('html')
  .setAttribute('lang', internationalization.locale)

export default internationalization
