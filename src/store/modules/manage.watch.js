import { HTTP } from '../http'
import router from '~/router'

// state
export const state = {
  watch: []
}

// getters
export const getters = {
  watch: state => state.watch,
  check: state => Boolean(state.watch)
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

  async update ({ commit }, params) {
    await commit('UPDATE_AN_WATCH', params)
  },

  async remove ({ commit }, params) {
    const { data } = await HTTP.delete(`/watch/${this.item.id}`)
    if (data.status) {
      router.push({
        name: 'auth.main'
      })
    }
  }
}
