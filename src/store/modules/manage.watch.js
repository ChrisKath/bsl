import { HTTP } from '../http'
import core from '~/router'

// state
export const state = {
  board: true,
  watch: [],
  search: ''
}

// getters
export const getters = {
  board: state => state.board,
  watch: state => state.watch,
  check: state => Object.keys(state.watch).length,
  search: state => state.search
}

// mutations
export const mutations = {
  CALL_DATA (state, payload) {
    state.board = payload.length
      ? payload
      : null
  },

  TAKE_DATA (state, payload) {
    payload.forEach((item, key) => state.board.push(item))
  },

  MOCK_DATA (state, payload) {
    state.watch = payload
  },

  FLYING (state, payload) {
    state.watch.updated_by = payload.name
    state.watch.updated_at = Date.now()
  },

  SEARCHING (state, payload) {
    state.search = payload
  }
}

// actions
export const actions = {
  async call ({ commit }, params) {
    const { data } = await HTTP.get('/watch')
    commit('CALL_DATA', data)
  },

  async take ({ commit }, params) {
    const { data } = await HTTP.post('/watch/take', params)
    commit('TAKE_DATA', data)
  },

  async mock ({ commit }, params) {
    const { data } = await HTTP.get(`/watch/${params}`)
    data === false
      ? core.push({name: 'auth.main'})
      : commit('MOCK_DATA', data)
  },

  async add ({ commit }, params) {
    const { data } = await HTTP.post('/watch', params)

    core.push({
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
      core.push({
        name: 'auth.watch',
        params: {key: params.form.key}
      })
    }
  },

  async fly ({ commit }, params) {
    const { data } = await HTTP.post('/watch/fly', params)
    if (data.status) commit('FLYING', data)
  },

  async remove ({ commit }, params) {
    const { data } = await HTTP.delete(`/watch/${params}`)
    if (data.status) {
      core.push({
        name: 'auth.main'
      })
    }
  },

  keyExist ({ commit }, key) {
    core.app.$notice.error({
      title: 'Error exist key',
      desc: `<b>[${key}]</b> This Short Key is already exist.`,
      duration: 6.4
    })
  },

  async search ({ commit }, params) {
    if (params.hook) {
      const { data } = await HTTP.post('/watch/search', {search: params.search})
      commit('CALL_DATA', data)
    }
    commit('SEARCHING', params.search)
  },

  async firuta ({ commit }, params) {
    const { data } = await HTTP.post('/watch/firuta', params)
    commit('CALL_DATA', data)
  }
}
