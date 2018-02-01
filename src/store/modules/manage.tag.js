// import { HTTP } from '../http'

// state
export const state = {
  tags: [
    {id: 1, name: 'promotion', timestamp: Date.now()},
    {id: 2, name: 'campaign',  timestamp: Date.now()},
    {id: 3, name: 'other',     timestamp: Date.now()}
  ]
}

// getters
export const getters = {
  tags: state => state.tags
}

// mutations
export const mutations = {
  FETCH_NEW_TAG (state, payload) {
    state.tags.push({
      id: state.tags.length + 1,
      name: payload,
      timestamp: Date.now()
    })
  },

  REMOVE_AN_TAG (state, payload) {
    state.tags = window.app.$lodash.reject(state.tags, {
      name: payload
    })
  }
}

// actions
export const actions = {
  async add ({ commit }, params) {
    await commit('FETCH_NEW_TAG', params)
    window.app.$notice.success({
      duration: 2.6,
      title: 'Good job!!',
      desc: `(${params}), New Tag has been added.`
    })
  },

  async remove ({ commit }, params) {
    await commit('REMOVE_AN_TAG', params)
    window.app.$notice.warning({
      duration: 2.6,
      title: 'That OK!',
      desc: `Tag (${params}) has been removed.`
    })
  }
}
