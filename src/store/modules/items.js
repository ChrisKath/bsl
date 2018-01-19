// import { HTTP } from '../http'
// import router from '~/router'

// state
export const state = {
  item: {
    key: 'VMLxoY1',
    title: 'TITLE NAME',
    tag: ['one', 'two', 'three'],
    origin: 'https://www.youtube.com/watch?v=WNQ2kzT_ASo&index=47&list=PLgcpjS-w00LUaRWSk1JnH5KvJXINZgGLp',
    exp: '2018-12-31',
    fly: false,
    click: 8,
    create_at: new Date(),
    create_by: 'ゴジです',
    update_at: new Date(),
    update_by: 'ゴジです'
  }
}

// getters
export const getters = {
  item: state => state.item
}

// mutations
export const mutations = {
  FETCH_ACTIVE (state, { val }) {
    console.log(val)
  },

  REMOVE_SET (state, set) {
    state.item.$remove(set)
  }
}

// actions
export const actions = {
  onTheFly ({ commit }, value) {
    commit('FETCH_ACTIVE', { val: value })
  },

  removed ({ commit }, set) {
    commit('REMOVE_SET', set)
  }
}
