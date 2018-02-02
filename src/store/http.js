// See more guide (https://github.com/mzabriskie/axios)
import Axios from 'axios'
import cookieStore from 'vue-cookie'
const config = require('../../config')

export const HTTP = Axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? config.build.api
    : config.dev.api,
  headers: {
    'X-CSRF-TOKEN': cookieStore.get('XSRF-TOKEN'),
    'Authorization': `Bearer ${cookieStore.get(window.app.$typeA)}`
  },
  timeout: 15000
})
