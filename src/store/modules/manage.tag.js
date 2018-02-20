import { HTTP } from '../http'
import core from '~/router'

// state
export const state = {
  tags: []
}

// getters
export const getters = {
  tags: state => state.tags
}

// mutations
export const mutations = {
  FETCH_TAGS (state, payload) {
    state.tags = payload
  },

  FETCH_NEW_TAG (state, payload) {
    state.tags.push(payload)
  },

  REMOVE_AN_TAG (state, payload) {
    state.tags = core.app.$lodash.reject(state.tags, {
      id: payload
    })
  }
}

// actions
export const actions = {
  async call ({ commit }) {
    const { data } = await HTTP.get('/tags')
    commit('FETCH_TAGS', data)
  },

  async add ({ commit }, params) {
    const { data } = await HTTP.post('/tags', {name: params})
    if (!data.status) {
      core.app.$notice.error({
        title: 'Oops!!',
        desc: 'This name has already been used.'
      })
    } else {
      await commit('FETCH_NEW_TAG', data.item)
      core.app.$notice.success({
        title: 'Good job!!',
        desc: `<b>(${data.item.name})</b>, New Tag has been added.`
      })
    }

    return data.status
  },

  async remove ({ commit }, params) {
    const { data } = await HTTP.delete(`/tags/${params.id}`)
    if (data.status) {
      commit('REMOVE_AN_TAG', params.id)
      core.app.$notice.warning({
        title: 'Removed!',
        desc: `<b>(${params.name})</b>, Tag has been removed.`
      })
    }
  }
}
