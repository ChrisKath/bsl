import HTTP from 'axios'
import Cookies from 'vue-cookie'

// state
export const state = {
  user: null,
  token: Cookies.get('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null && state.token
}

// mutations
export const mutations = {
  SAVE_TOKEN (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? '1M' : null })
  },

  FETCH_USER_SUCCESS (state, { user }) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
    Cookies.delete('token')
  },

  LOGOUT (state) {
    state.user = null
    state.token = null
    Cookies.delete('token')
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit('SAVE_TOKEN', payload)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await HTTP.get('/api/user')
      commit('FETCH_USER_SUCCESS', { user: data })
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },

  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await HTTP.post('/api/logout')
    } catch (e) {
      console.error(e)
    }
    commit('LOGOUT')
  }
}
