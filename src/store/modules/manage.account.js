import { HTTP } from '../http'
import router from '~/router'

// state
export const state = {
  users: []
}

// getters
export const getters = {
  users: state => state.users,
  check: state => Object.keys(state.users).length
}

// mutations
export const mutations = {
  FETCH_DATA (state, payload) {
    state.users = payload
  },

  FETCH_NEW_USER (state, payload) {
    // state.users.push()
  },

  UPDATE_AN_USER (state, payload) {
    //
  }
}

// actions
export const actions = {
  async call ({ commit }) {
    const { data } = await HTTP.get('/panel')
    commit('FETCH_DATA', data)
  },

  async add ({ commit, dispatch }, params) {
    const { data } = await HTTP.post('/panel', params)

    if (!data.ststus) {
      if (data.code === 16) dispatch('uExist')
      else if (data.code === 40) dispatch('eExist')
    } else {
      dispatch('isSuccess')
    }

    return data.ststus
  },

  async update ({ commit, dispatch }, params) {
    await commit('UPDATE_AN_USER', params)
    dispatch('isSuccess')
  },

  isSuccess () {
    window.app.$loading.start()
    window.app.$notice.success({
      duration: 2.4,
      title: 'Successful',
      desc: 'New account has been created.'
    })
    setTimeout(h => router.push({name: 'auth.panel'}), 1999)
  },

  isError () {
    window.app.$notice.error({
      title: 'Oops!!',
      desc: 'Something went wrong.'
    })
  },

  uExist () {
    window.app.$notice.error({
      title: 'Oops!!',
      desc: 'Username is already used.'
    })
  },

  eExist () {
    window.app.$notice.error({
      title: 'Oops!!',
      desc: 'Email Address is already used.'
    })
  }
}
