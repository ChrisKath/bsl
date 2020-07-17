/**
 * Local Storege Manager.
 */
export const storage: any = {
  get: (key: string): any => {
    if (localStorage.getItem(key)) {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        localStorage.removeItem(key)
        throw error
      }
    }
  },

  set: (key: string, input: any): void => {
    localStorage.setItem(key, input)
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  }
}

/**
 * Session Storege Manager.
 */
export const session: any = {
  get: (key: string): any => {
    if (sessionStorage.getItem(key)) {
      try {
        return sessionStorage.getItem(key)
      } catch (error) {
        sessionStorage.removeItem(key)
        throw error
      }
    }
  },

  set: (key: string, input: any): void => {
    sessionStorage.setItem(key, input)
  },

  remove: (key: string): void => {
    sessionStorage.removeItem(key)
  }
}