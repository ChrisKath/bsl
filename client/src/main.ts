import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
import '@/registerDefineProperty'
import '@/assets/style/Index.less'

// Include any dependencies modules
import { load, alert } from '@/utils'
import moment from 'moment'
import InputProvider from '@/components/Input.vue'
const components: any = {
  InputProvider
}

// Installation global components.
for (const key in components) Vue.component(key, components[key])

// Instanced Config
Vue.prototype.$load = load
Vue.prototype.$alert = alert
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.config.devtools = (process.env.NODE_ENV !== 'production')

// Vue Instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.info('🚀 Application Running...')