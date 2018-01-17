import { HTTP } from '../http'
import router from '~/router'
import cookie from 'vue-cookie'

// state
export const state = {
  user: cookie.get('uid')
}

// getters
export const getters = {
  user: state => state.user,
  check: state => Boolean(state.user)
}

// mutations
export const mutations = {
  FETCH_USER_SUCCESS (state, { user }) {
    if (user) {
      state.user = user
      cookie.set('uid', user._token, {
        expires: user.remember
          ? '15D'
          : '30m'
      })
      router.push({name: 'auth.main'})
    } else {
      router.app.$Loading.finish()
      router.app.$Notice.error({
        title: 'Authentication Failed.',
        desc: 'Username or Password is incorrect'
      })
    }
  },

  USER_LOGOUT (state) {
    state.user = null
    cookie.delete('uid')
  }
}

// actions
export const actions = {
  async login ({ commit }, form) {
    try {
      const { data } = await HTTP.post('/api/v1/check', form)
      commit('FETCH_USER_SUCCESS', {user: data})
    } catch (e) {
      commit('USER_LOGOUT') // IF: FETCH_USER_FAILURE
    }
  },

  async logout ({ commit }) {
    try {
      await HTTP.get('/api/v1/logout')
      await commit('USER_LOGOUT')
      router.push({name: 'guest.login'})
    } catch (e) {
      console.error(e)
    }
  }
}
