import { HTTP } from '../http'
import router from '~/router'

// state
export const state = {
  watch: []
}

// getters
export const getters = {
  watch: state => state.watch,
  check: state => Object.keys(state.watch).length
}

// mutations
export const mutations = {
  MOCK_DATA (state, payload) {
    state.watch = payload
  }
}

// actions
export const actions = {
  async mock ({ commit }, params) {
    const { data } = await HTTP.get(`/watch/${params}`)
    data === false
      ? router.push({name: 'auth.main'})
      : commit('MOCK_DATA', data)
  },

  async add ({ commit }, params) {
    const { data } = await HTTP.post('/watch', params)

    router.push({
      name: 'auth.watch',
      params: { key: data.key }
    })
  },

  async update ({ commit, dispatch }, params) {
    const { data } = await HTTP.patch(`/watch/${params.id}`, params.form)
    if (!data.status) {
      dispatch(/** notice-error **/ 'keyExist', params.form.key)
      return false
    } else {
      router.push({
        name: 'auth.watch',
        params: {key: params.form.key}
      })
    }
  },

  async remove ({ commit }, params) {
    const { data } = await HTTP.delete(`/watch/${params}`)
    if (data.status) {
      router.push({
        name: 'auth.main'
      })
    }
  },

  keyExist ({ commit }, key) {
    router.app.$notice.error({
      title: 'Error exist key',
      desc:  `<b>[${key}]</b> This Short Key is already exist.`,
      duration: 6.4
    })
  }
}
