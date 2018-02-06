import { HTTP } from '../http'
import router from '~/router'
import cookieStore from 'vue-cookie'

let valve = null

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
      HTTP.defaults.headers.common['Authorization'] = `Bearer ${value}`

      router.push({name: 'auth.main'})
    } else {
      state.voice = null
      cookieStore.delete(window.app.$typeA)
      window.app.$loading.error()
      window.app.$notice.error({
        title: window.app.$t('i.notice.authFailed.title'),
        desc: window.app.$t('i.notice.authFailed.desc')
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
          HTTP.defaults.headers.common['Authorization'] = `Bearer ${state.voice}`
        }
      }, true)
    }
  },

  LOGOUT (state) {
    state.voice = null
    cookieStore.delete(window.app.$typeA)
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${state.voice}`
  }
}

// actions
export const actions = {
  async signin ({ commit, dispatch }, params) {
    const { data } = await HTTP.post('/check', params)
    await commit('FETCH_AUTH_SUCCESS', data)
    if (!params.remember) commit('FETCH_COOKIE')

    dispatch('cookies')
  },

  async signout ({ commit }) {
    const { data } = await HTTP.post('/logout')
    if (data.status) {
      commit('LOGOUT')
      clearInterval(valve)
      router.push({name: 'guest.login'})
    }
  },

  cookies ({ commit, dispatch }) {
    commit('FETCH_COOKIE')

    window.app.$notice.destroy()

    valve = setInterval(async callback => {
      if (!cookieStore.get(window.app.$typeA)) {
        clearInterval(valve)

        await dispatch('signout')

        window.app.$notice.warning({
          duration: 0,
          title: window.app.$t('i.notice.authDenied.title'),
          desc: window.app.$t('i.notice.authDenied.desc')
        })
      }
    }, 2000)
  }
}
