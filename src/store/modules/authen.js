import { HTTP } from '../http'
import core from '~/router'
import cookieStorage from 'vue-cookie'

var typeA = 'TYPE.Authentication'
var VALVE = null

// state
export const state = {
  voice: cookieStorage.get('TYPE.Authentication') || 0
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
  },

  LOGGED_OUT (state) {
    HTTP.defaults.headers.common['Authorization'] = ''
    state.voice = 0
    cookieStorage.delete(typeA)
    core.push({name: 'guest.login'})
  },

  HTTP_HEADERS (state, payload) {
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`
  }
}

// actions
export const actions = {
  async signin ({ commit, dispatch }, params) {
    const { data } = await HTTP.post('/auth/login', params)

    if (data.passive) {
      return core.push({
        name: 'guest.reset',
        params: {
          passive: `${data.passive.id}.${data.passive.username}`
        }
      })
    }

    if (data.error || !data) dispatch(/** notice-error **/ 'authFailed')
    else {
      localStorage.setItem('TYPE.Remember', params.remember)
      cookieStorage.set(typeA, data.access_token, {
        expires: params.remember ? '30D' : '30m'
      })
      await commit('HTTP_HEADERS', data.access_token)
      await dispatch('fetchAuth')
      await dispatch('verifyCookies')
      core.push({name: 'auth.main'})
    }
  },

  async fetchAuth ({ commit }) {
    const token = cookieStorage.get(typeA)
    if (token) {
      await commit('HTTP_HEADERS', token)
      const { data } = await HTTP.post('/auth/me')
      commit('FETCH_USER_AUTH', data)
    }
  },

  async signout ({ commit }) {
    await HTTP.post('/auth/logout')
    clearInterval(VALVE)
    commit('LOGGED_OUT')
  },

  verifyCookies ({ state, dispatch }) {
    core.app.$notice.destroy()

    if (localStorage.getItem('TYPE.Remember') === 'false') {
      window.addEventListener('click', events => {
        let token = cookieStorage.get(typeA)
        if (state.voice && token) {
          cookieStorage.set(typeA, token, {expires: '30m'})
        }
      }, true)
    }

    VALVE = setInterval(async h => {
      if (!cookieStorage.get(typeA)) {
        clearInterval(VALVE)
        await dispatch('signout')
        dispatch(/** notice-warning **/ 'authDenied')
      }
    }, 2000)
  },

  authFailed () {
    core.app.$notice.error({
      title: core.app.$t('i.notice.authFailed.title'),
      desc:  core.app.$t('i.notice.authFailed.desc'),
      duration: 10
    })
    core.app.$loading.error()
  },

  authDenied () {
    core.app.$notice.warning({
      title: core.app.$t('i.notice.authDenied.title'),
      desc:  core.app.$t('i.notice.authDenied.desc'),
      duration: 0
    })
  }
}
