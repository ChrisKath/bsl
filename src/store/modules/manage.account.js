import { HTTP } from '../http'
import core from '~/router'

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

  RESETO (state, payload) {
    const user = core.app.$lodash.find(state.users, [
      'id', payload.id
    ])
    user.passive = 0
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

    if (!data.ststus && data.error) {
      dispatch(/** notice-error **/ 'isError', data.error)
    } else {
      dispatch(/** notice-success **/ 'isCreated')
    }

    return data.ststus
  },

  async update ({ commit, dispatch }, params) {
    const { data } = await HTTP.patch(`/panel/${params.id}`, params.form)

    if (!data.status) {
      dispatch(/** notice-error **/ 'isError', data.error)
    } else {
      dispatch(/** notice-success **/ 'isUpdated', params.form.name)
    }

    return data.status
  },

  async reset ({ commit }, params) {
    await HTTP.post('/panel/pwd/reset', params)
    await commit('RESETO', params)
    core.app.$notice.success({
      title: 'Successful',
      desc: `<b class=txt-up>${params.username}</b>, has been reset password.`
    })
  },

  isCreated () {
    core.app.$loading.start()
    core.app.$notice.success({
      duration: 2.4,
      title: 'Successful',
      desc: 'New account has been created.'
    })
    setTimeout(h => core.push({name: 'auth.panel'}), 512)
  },

  isUpdated ({ commit }, name) {
    core.app.$loading.start()
    core.app.$notice.success({
      duration: 2,
      title: 'Successful',
      desc: `<b>${name}</b>, has been updated.`
    })
    setTimeout(h => core.push({name: 'auth.panel'}), 512)
  },

  isError ({ commit }, errInfo) {
    core.app.$notice.error({
      duration: 10,
      title: 'Wrong!!',
      desc: errInfo[2]
    })
  }
}
