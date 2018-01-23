// import { HTTP } from '../http'
import router from '~/router'

const _app = router.app

// state
export const state = {
  accounts: [
    {
      uid: Date.now(),
      permis: '#',
      name: 'CREATOR',
      email: 'root@tap.co',
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
  FETCH_NEW_ACCOUNT (state, { data }) {
    state.accounts.push({
      uid     : Date.now(),
      permis  : data.permis,
      name    : data.name,
      email   : data.email,
      username: data.username
    })
  },

  UPDATE_AN_ACCOUNT (state, { data }) {
    const finded = _app.$lodash.find(state.accounts, {
      uid: data.uid
    })
    finded.permis   = data.permis
    finded.name     = data.name
    finded.email    = data.email
    finded.username = data.username
  },

  NOTICE (status) {
    _app.$Loading.start()
    _app.$Notice.success({
      duration: 2.4,
      title: 'Success',
      desc: 'New account has been created.'
    })
    setTimeout(() => {
      router.push({name: 'auth.panel'})
    }, 2400)
  }
}

// actions
export const actions = {
  async add ({ commit }, params) {
    await commit('FETCH_NEW_ACCOUNT', {
      data: params
    })
    await commit('NOTICE', true)
  },

  async edit ({ commit }, params) {
    await commit('UPDATE_AN_ACCOUNT', {
      data: params
    })
    await commit('NOTICE', true)
  }
}
