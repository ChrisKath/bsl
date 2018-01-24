// import { HTTP } from '../http'
import router from '~/router'

// state
export const state = {
  tags: [
    {id: 1, name: 'campaign',  timestamp: Date.now()},
    {id: 2, name: 'promotion', timestamp: Date.now()},
    {id: 3, name: 'email',     timestamp: Date.now()},
    {id: 4, name: 'sms',       timestamp: Date.now()}
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
    state.tags = router.app.$lodash.reject(state.tags, {
      name: payload
    })
  }
}

// actions
export const actions = {
  async add ({ commit }, params) {
    await commit('FETCH_NEW_TAG', params)
    router.app.$Notice.success({
      duration: 2.6,
      title: 'Good job!!',
      desc: `(${params}), New Tag has been added.`
    })
  },

  async remove ({ commit }, params) {
    await commit('REMOVE_AN_TAG', params)
    router.app.$Notice.warning({
      duration: 2.6,
      title: 'That OK!',
      desc: `Tag (${params}) has been removed.`
    })
  }
}