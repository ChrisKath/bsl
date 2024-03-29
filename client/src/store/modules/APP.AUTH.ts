import configs from '@/configs/app'
import axios from '@/configs/axios'
import { getCookie, setCookie } from 'tiny-cookie'
const cookieToken: any = getCookie(configs.APP_AUTH)

// State
export const state: any = {
  authenticated: Boolean(cookieToken),
  token: cookieToken
}

// Getters
export const getters: any = {
  hasAuth (state: any): boolean {
    return Boolean(state.authenticated && state.token)
  }
}

// Mutations
export const mutations: any = {
  SET_STATE (state: any, payload: { field: string, value: any }): void {
    state[payload.field] = payload.value
  }
}

// Actions
export const actions: any = {
  /**
   * Create cookie for Authorization
   *
   * @param {object} input
   */
  createCookie ({ commit }: any, input: any): void {
    setCookie(configs.APP_AUTH, input.token, {
      expires: input.expires
    })

    commit('SET_STATE', {
      field: 'authenticated',
      value: true
    })
  },

  /**
   * Sign-in with Username and Password
   *
   * @param {object} input
   */
  async login ({}: any, input: any): Promise<any> {
    try {
      const response: any = await axios.post('/auth/login', input)
      return response.data
    } catch (errors) {
      return errors.data
    }
  },

  /**
   * Create password for first sign-in
   *
   * @param {object} input 
   */
  async createPassword ({}: any, input: any): Promise<any> {
    try {
      const response: any = await axios.post('/auth/setPassword', input)
      return response.data
    } catch (errors) {
      return errors.data
    }
  }
}