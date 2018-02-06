// See more guide (https://github.com/mzabriskie/axios)
import Axios from 'axios'
const config = require('../../config')

export const HTTP = Axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? config.build.api
    : config.dev.api
})
