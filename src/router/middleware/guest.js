import store from '~/store'

export default (to, from, next) => {
  if (store.getters['authen/check']) {
    next({name: 'auth.main'})
  } else {
    next()
  }
}
