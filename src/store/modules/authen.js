import { HTTP } from '../http'
import router from '~/router'
import cookieStore from 'vue-cookie'

// state
export const state = {
  voice: cookieStore.get('TYPE.Authentication') || null
}

// getters
export const getters = {
  check: state => Boolean(state.voice),
  voice: state => {
    const { value } = router.app.$jwt.decode(
      router.app.$secret, state.voice
    )
    return value
  }
}

// mutations
export const mutations = {
  FETCH_AUTH_SUCCESS (state, payload) {
    if (payload) {
      const observe = Object.assign({ payload }, {
        iss: 'TAP Technology co., ltd.',
        aud: 'P-R-I-V-A-T-E M-E-M-B-E-R',
        iat: Date.now()
      })
      const { value } = window.app.$jwt.encode(window.app.$secret, observe)

      state.voice = value
      cookieStore.set(window.app.$typeA, value, {
        expires: payload.remember
          ? '15D'
          : '15m'
      })

      router.push({name: 'auth.main'})
    } else {
      state.voice = null
      cookieStore.delete(window.app.$typeA)
      window.app.$loading.error()
      window.app.$notice.error({
        title: 'Authentication Failed.',
        desc: 'Username or Password is incorrect'
      })
    }
  },

  FETCH_COOKIE (state) {
    const { value } = window.app.$jwt.decode(window.app.$secret, state.voice)
    if (value && value.remember === false) {
      window.addEventListener('click', events => {
        if (!cookieStore.get(window.app.$typeA)) {
          state.voice = null
          return false
        } else {
          cookieStore.set(window.app.$typeA, state.voice, {
            expires: '15m'
          })
        }
      }, true)
    }
  },

  LOGOUT (state) {
    state.voice = null
    cookieStore.delete(window.app.$typeA)
  }
}

// actions
export const actions = {
  async signin ({ commit, dispatch }, params) {
    try {
      const { data } = await HTTP.post('/check', params)
      await commit('FETCH_AUTH_SUCCESS', data)
      if (!params.remember) commit('FETCH_COOKIE')
    } catch (e) {
      commit('LOGOUT')
      console.error(e)
    }
  },

  async signout ({ commit }) {
    try {
      const { data } = await HTTP.post('/logout')
      if (data.status) {
        commit('LOGOUT')
        router.push({name: 'guest.login'})
      }
    } catch (e) {
      console.error(e)
    }
  },

  cookies ({ commit, state }) {
    if (state.voice !== null) commit('FETCH_COOKIE')
  }
}
