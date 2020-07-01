export default {
  WEB_TITLE: 'Brand Short Link Project | Private Web App (Remastered)',
  APP_NAME: 'Brand Short Link',
  APP_MODE: process.env.NODE_ENV,

  // APP KEYs-NAME
  APP_AUTH: 'APP.SmartContract',
  APP_USER: 'APP.UserInfo',
  APP_LANG: 'APP.Language',
  AUTH_TOKEN: 'Authorization',
  XSRF_TOKEN: 'XSRF-TOKEN',
  X_CSRF_TOKEN: 'X-CSRF-TOKEN',
  CONTENT_LANG: 'Content-Language',
  APP_API: (process.env.NODE_ENV !== 'production')
    ? 'http://localhost:3000/api/v2'
    : `${location.origin}/api/v2`,

  // APP SECRET-KEY
  SECRET_KEY: 'S5PV-TXTF-GFKU-1PIZ'
}