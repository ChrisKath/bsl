import { HTTP } from '../http'
import router from '~/router'
import JWToken from 'json-web-token'
import cookieStore from 'vue-cookie'

// setup Instant.
const _app = router.app
const _name = 'TYPE.Authentication'
const _seed = {
  iss: 'TAP Technology co., ltd.',
  aud: 'Private user',
  iat: Date.now()
}
const secret = 'H-I-M-I-T-S-U-K-E-N' // 秘密鍵

// state
export const state = {
  voice: cookieStore.get(_name) || null
}

// getters
export const getters = {
  voice: state => state.voice,
  check: state => Boolean(state.voice)
}

// mutations
export const mutations = {
  FETCH_AUTH_SUCCESS (state, payload) {
    if (payload) {
      const observe = Object.assign({ payload }, _seed)
      const encrypt = JWToken.encode(secret, observe)

      cookieStore.set(_name, encrypt.value, {
        expires: payload.remember
          ? '15D'
          : '30m'
      })

      state.voice = encrypt.value
      router.push({name: 'auth.main'})
    } else {
      state.voice = null
      _app.$Loading.error()
      _app.$Notice.error({
        title: 'Authentication Failed.',
        desc: 'Username or Password is incorrect'
      })
    }
  },

  LOGOUT (state) {
    state.voice = null
    cookieStore.delete(_name)
  }
}

// actions
export const actions = {
  async signin ({ commit }, params) {
    try {
      // const response = await HTTP.post('/api/v1/check', params)
      await commit('FETCH_AUTH_SUCCESS', params)
    } catch (e) {
      // IF: FETCH_USER_FAILURE
      commit('LOGOUT')
    }
  },

  async signout ({ commit }) {
    try {
      await HTTP.get('/api/v1/logout')
      await commit('LOGOUT')
      router.push({name: 'guest.login'})
    } catch (e) {
      console.error(e)
    }
  }
}
