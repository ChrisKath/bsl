import { HTTP } from '../http'
import router from '~/router'
import cookie from 'vue-cookie'

// state
export const state = {
  user: (cookie.get('uid') !== 'undefined')
    ? cookie.get('uid')
    : null
}

// getters
export const getters = {
  user: state => state.user,
  check: state => Boolean(state.user)
}

// mutations
export const mutations = {
  SAVE_TOKEN (state) {
    const obj = Object.assign({}, state.user)
    cookie.set('uid', obj._token, {
      expires: obj.remember
        ? '15D'
        : '5m'
    })
  },

  FETCH_USER_SUCCESS (state, { user }) {
    state.user = user
  },

  USER_LOGOUT (state) {
    state.user = null
    cookie.delete('uid')
  }
}

// actions
export const actions = {
  async login ({ commit }, {form, vm}) {
    try {
      const { data } = await HTTP.post('/api/v1/check', form)
      await commit('FETCH_USER_SUCCESS', { user: data })
      await commit('SAVE_TOKEN')
      if (data) router.push({name: 'auth.main'})
      else {
        vm.$Loading.finish()
        vm.$Notice.error({
          title: 'Authentication Failed.',
          desc: 'Username or Password is incorrect'
        })
      }
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
