import { HTTP } from '../http'
import router from '~/router'
import cookieStorage from 'vue-cookie'

let valve = null

// state
export const state = {
  voice: cookieStorage.get('TYPE.Authentication') || null
}

// getters
export const getters = {
  voice: state => state.voice,
  check: state => Boolean(state.voice)
}

// mutations
export const mutations = {
  FETCH_USER_AUTH (state, payload) {
    state.voice = payload
    router.push({name: 'auth.main'})
  },

  LOGGED_OUT (state) {
    HTTP.defaults.headers.common['Authorization'] = null
    cookieStorage.delete(router.app.$typeA)
    state.voice = null
    router.push({name: 'guest.login'})
  },

  HTTP_HEADERS (state, payload) {
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`
  }
}

// actions
export const actions = {
  async signin ({ commit, dispatch }, params) {
    const { data } = await HTTP.post('/auth/login', params)

    if (data.error || !data) dispatch(/** notice-error **/ 'authFailed')
    else {
      cookieStorage.set('TYPE.Remember', params.remember, 1)
      cookieStorage.set(window.app.$typeA, data.access_token, {
        expires: `${data.expires_in}m`
      })
      await commit('HTTP_HEADERS', data.access_token)
      await dispatch('fetchAuth')
      await dispatch('verifyCookies')
    }
  },

  async fetchAuth ({ commit }) {
    const token = cookieStorage.get(router.app.$typeA)
    if (token) {
      await commit('HTTP_HEADERS', token)
      const { data } = await HTTP.post('/auth/me')
      commit('FETCH_USER_AUTH', data)
    }
  },

  async signout ({ commit }) {
    const { data } = await HTTP.post('/auth/logout')
    if (data.status) {
      clearInterval(valve)
      commit('LOGGED_OUT')
    }
  },

  verifyCookies ({ state, dispatch }) {
    window.app.$notice.destroy()

    if (cookieStorage.get('TYPE.Remember') === 'false') {
      window.addEventListener('click', events => {
        if (state.voice) {
          cookieStorage.set(
            window.app.$typeA,
            cookieStorage.get(window.app.$typeA),
            { expires: '30m' }
          )
        }
      }, true)
    }

    valve = setInterval(async callback => {
      if (!cookieStorage.get(window.app.$typeA)) {
        clearInterval(valve)
        await dispatch('signout')
        dispatch(/** notice-warning **/ 'authDenied')
      }
    }, 2000)
  },

  authFailed () {
    router.app.$notice.error({
      title: router.app.$t('i.notice.authFailed.title'),
      desc:  router.app.$t('i.notice.authFailed.desc')
    })
    router.app.$loading.error()
  },

  authDenied () {
    router.app.$notice.warning({
      title: router.app.$t('i.notice.authDenied.title'),
      desc:  router.app.$t('i.notice.authDenied.desc'),
      duration: 0
    })
  }
}
