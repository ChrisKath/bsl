// import { HTTP } from '../http'
import router from '~/router'

// state
export const state = {
  accounts: [
    {
      uid: Date.now(),
      permis: '#',
      name: 'CREATOR',
      email: 'root@tap10.com',
      username: 'root'
    },
    {
      uid: Date.now() + 1,
      permis: 0,
      name: 'DISPLAY NAME',
      email: 'admin@tap.co',
      username: 'admin'
    }
  ]
}

// getters
export const getters = {
  accounts: state => state.accounts
}

// mutations
export const mutations = {
  FETCH_NEW_ACCOUNT (state, payload) {
    state.accounts.push({
      uid     : Date.now(),
      permis  : payload.permis,
      name    : payload.name,
      email   : payload.email,
      username: payload.username
    })
  },

  UPDATE_AN_ACCOUNT (state, payload) {
    const finded = router.app.$lodash.find(state.accounts, {
      uid: payload.uid
    })
    finded.permis   = payload.permis
    finded.name     = payload.name
    finded.email    = payload.email
    finded.username = payload.username
  },

  NOTICE (state, payload) {
    if (!payload) {
      router.app.$Notice.error({
        title: 'Oops!!',
        desc: 'Something went wrong.'
      })
    } else {
      router.app.$Loading.start()
      router.app.$Notice.success({
        duration: 2.4,
        title: 'Successful',
        desc: 'New account has been created.'
      })
      setTimeout(() => router.push({name: 'auth.panel'}), 2400)
    }
  }
}

// actions
export const actions = {
  async add ({ commit }, params) {
    await commit('FETCH_NEW_ACCOUNT', params)
    commit('NOTICE', true)
  },

  async edit ({ commit }, params) {
    await commit('UPDATE_AN_ACCOUNT', params)
    commit('NOTICE', true)
  }
}
