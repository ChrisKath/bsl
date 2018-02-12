import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locale } from 'iview'

Vue.use(VueI18n)

const requireContext = require.context('./locale/lang', false, /.*\.js$/)
export const messages = requireContext.keys()
  .map(file => [
    file.replace(/(^.\/)|(\.js$)/g, ''),
    requireContext(file)
  ])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) module.namespaced = true
    return {
      ...modules,
      [name]: module.default
    }
  }, {})

// Create VueI18n instance with options
const internationalization = new VueI18n({
  fallback: 'en-US',
  messages,
  locale: localStorage.getItem('TYPE.Internationalization') || navigator.language
})

locale(messages[internationalization.locale])
document.querySelector('html').setAttribute(
  'lang',
  internationalization.locale
)

export function take (param) {
  if (!param || internationalization.locale === param) return
  internationalization.locale = param
  locale(messages[param])
  localStorage.setItem('TYPE.Internationalization', param)
  document.querySelector('html').setAttribute('lang', param)
}

export default internationalization
