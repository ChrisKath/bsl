import { isObjectEmpty } from '@/utils'

// State
export const state: any = {
  load: false,
  alert: {
    status: false,
    title: '📣 System Alert',
    message: '',
    config: {
      type: 'dialog',
      showTitle: true,
      showBtnCancel: false
    }
  }
}

// Getters
export const getters: any = {
  load (state: any): boolean {
    return state.load
  },

  alert (state: any): any {
    return state.alert
  }
}

// Mutations
export const mutations: any = {
  SET_STATE (state: any, payload: { field: string, value: any }): void {
    state[payload.field] = payload.value
  },

  SET_ALERT (state: any, payload: any): void {
    state.alert.status  = payload.status
    state.alert.title   = payload.title
    state.alert.message = payload.message

    if ('config' in payload && !isObjectEmpty(payload.config)) {
      for (const propName in payload.config) {
        state.alert.config[propName] = payload.config[propName]
      }
    }
  }
}

// Actions
export const actions: any = {}