// import { HTTP } from '../http'
import router from '~/router'
import cookieStore from 'vue-cookie'

var logged = null

// state
export const state = {
  watch: []
}

// getters
export const getters = {
  watch: state => state.watch,
  haved: state => Boolean(state.watch.length)
}

// mutations
export const mutations = {
  FETCH_NEW_WATCH (state, payload) {
    const hash = new URL(payload.href).hostname.replace('www.', '')
    const isKey = '1mqoNSf' //window.btoa(Math.random()).substr(0, 7)

    state.watch.push({
      key: isKey,
      href: payload.href,
      name: hash,
      tags: payload.tags,
      click: 0,
      fly: true,
      expiry: null,
      redir: null,
      create_at: Date.now(),
      update_at: Date.now(),
      create_by: logged.username,
      update_by: logged.username
    })

    router.push({name: 'auth.watch', params: {key: isKey}})
  },

  UPDATE_AN_WATCH (state, payload) {
    const hash = new URL(payload.href).hostname.replace('www.', '')
    const query = window.app.$lodash.find(state.watch, {
      key: payload.currentKey
    })

    query.key       = payload.key
    query.href      = payload.href
    query.name      = payload.name || hash
    query.tags      = payload.tags
    query.expiry    = payload.expiry || null
    query.redir     = payload.redir || null
    query.update_at = Date.now()
    query.update_by = logged.username

    router.push({name: 'auth.watch', params: {key: payload.key}})
  },

  REMOVE_AN_WATCH (state, payload) {
    state.watch = window.app.$lodash.reject(state.watch, {
      key: payload
    })

    router.push({name: 'auth.main'})
  },

  DISABLE_AN_WATCH (state, payload) {
    const query = window.app.$lodash.find(state.watch, {
      key: payload.key
    })

    query.fly       = payload.value
    query.update_at = Date.now()
    query.update_by = logged.username
  }
}

// actions
export const actions = {
  async add ({ commit, dispatch }, params) {
    await dispatch('authen')
    await commit('FETCH_NEW_WATCH', params)
  },

  async update ({ commit, dispatch }, params) {
    await dispatch('authen')
    await commit('UPDATE_AN_WATCH', params)
  },

  async remove ({ commit, dispatch }, params) {
    await dispatch('authen')
    await commit('REMOVE_AN_WATCH', params)
  },

  async disable ({ commit, dispatch }, params) {
    await dispatch('authen')
    await commit('DISABLE_AN_WATCH', params)
  },

  async authen () {
    logged = await window.app.$jwt.decode(
      window.app.$secret,
      cookieStore.get(window.app.$typeA)
    ).value
  }
}
