import { HTTP } from '../http'

// state
export const state = {
  brands: []
}

// getters
export const getters = {
  brands: state => state.brands
}

// mutations
export const mutations = {
  FETCH_BRANDS (state, payload) {
    state.brands = payload
  }
}

// actions
export const actions = {
  async call ({ commit }) {
    const { data } = await HTTP.get('/qr/brands')
    commit('FETCH_BRANDS', data)
  }
}
