// import { HTTP } from '../http'
import router from '~/router'
import cookieStore from 'vue-cookie'

// state
export const state = {
  voice: cookieStore.get('TYPE.Authentication') || null
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
      const observe = Object.assign({ payload }, {
        iss: 'TAP Technology co., ltd.',
        aud: 'P-R-I-V-A-T-E_M-E-M-B-E-R',
        iat: Date.now()
      })
      const { value } = window.app.$jwt.encode(window.app.$secret, observe)

      setTimeout((callback) => {
        cookieStore.set(window.app.$typeA, value, {
          expires: payload.remember
            ? '15D'
            : '15s'
        })

        state.voice = value
        router.push({name: 'auth.main'})
      }, 1280)
    } else {
      state.voice = null
      window.app.$loading.error()
      window.app.$notice.error({
        title: 'Authentication Failed.',
        desc: 'Username or Password is incorrect'
      })
    }
  },

  LOGOUT (state) {
    state.voice = null
    cookieStore.delete(window.app.$typeA)
  }
}

// actions
export const actions = {
  async signin ({ commit }, params) {
    try {
      // const { data } = await HTTP.post('/api/v1/check', params)
      await commit('FETCH_AUTH_SUCCESS', params)
    } catch (e) {
      // IF: FETCH_USER_FAILURE
      commit('LOGOUT')
    }
  },

  async signout ({ commit }) {
    try {
      // await HTTP.get('/api/v1/logout')
      await commit('LOGOUT')
      setTimeout(() => router.push({name: 'guest.login'}), 1280)
    } catch (e) {
      console.error(e)
    }
  }
}
