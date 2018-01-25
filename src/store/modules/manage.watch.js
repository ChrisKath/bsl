// import { HTTP } from '../http'
import router from '~/router'
import cookieStore from 'vue-cookie'

var logged = null

// state
export const state = {
  watch: [],
  created: null
}

// getters
export const getters = {
  watch: state => state.watch,
  haved: state => Boolean(state.watch.length)
}

// mutations
export const mutations = {
  FETCH_NEW_WATCH (state, payload) {
    logged = router.app.$jwt.decode(
      router.app.$secret,
      cookieStore.get(router.app.$typeA)
    ).value
    const domain = new URL(payload.url)
    const isKey = Date.now()

    state.watch.push({
      key: isKey,
      href: payload.url,
      name: domain.hostname,
      tags: payload.tags,
      click: 0,
      fly: true,
      create_at: Date.now(),
      update_at: Date.now(),
      create_by: logged.username,
      update_by: logged.username
    })

    router.push({name: 'auth.watch', params: {key: isKey}})
  },

  UPDATE_AN_WATCH (state, payload) {
    console.log(payload)
  },

  REMOVE_AN_WATCH (state, payload) {
    console.log(payload)
  },

  DISABLE_AN_WATCH (state, payload) {
    const finded = router.app.$lodash.find(state.watch, {
      key: payload.key
    })
    finded.fly = payload.value
  }
}

// actions
export const actions = {
  async add ({ commit }, params) {
    await commit('FETCH_NEW_WATCH', params)
  },

  async update ({ commit }, params) {
    await commit('UPDATE_AN_WATCH', params)
  },

  async remove ({ commit }, params) {
    await commit('REMOVE_AN_WATCH', params)
  },

  async disable ({ commit }, params) {
    await commit('DISABLE_AN_WATCH', params)
  }
}
