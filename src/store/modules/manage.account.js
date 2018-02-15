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
      dispatch(/** notice-error **/ 'isError', data.error[2])
    } else {
      dispatch(/** notice-success **/ 'isCreated')
    }

    return data.ststus
  },

  async update ({ commit, dispatch }, params) {
    const { data } = await HTTP.patch(`/panel/${params.id}`, params.form)

    if (!data.status) {
      dispatch(/** notice-error **/ 'isError', data.error[2])
    } else {
      dispatch(/** notice-success **/ 'isUpdated', params.form.name)
    }

    return data.status
  },

  isCreated () {
    window.app.$loading.start()
    window.app.$notice.success({
      duration: 2.4,
      title: 'Successful',
      desc: 'New account has been created.'
    })
    setTimeout(h => router.push({name: 'auth.panel'}), 512)
  },

  isUpdated ({ commit }, name) {
    window.app.$loading.start()
    window.app.$notice.success({
      duration: 2,
      title: 'Successful',
      desc: `<b>${name}</b>, has been updated.`
    })
    setTimeout(h => router.push({name: 'auth.panel'}), 512)
  },

  isError ({ commit }, errInfo) {
    window.app.$notice.error({
      duration: 10,
      title: 'Wrong!!',
      desc: errInfo
    })
  }
}
