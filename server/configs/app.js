require('dotenv').config()

module.exports = {
  appName       : process.env.APP_NAME || 'project_bsl',
  port          : process.env.PORT || 3000,
  isProduction  : process.env.NODE_ENV === 'production',
  apiVersion    : process.env.API_VERSION || 1,
  tokenExpiry   : process.env.JWT_TTL || '1d',
  secretKey     : process.env.JWT_SECRET || '',
  keyLength     : process.env.KEY_LENGTH || 6,
  
  dialect       : process.env.DB_DIALECT || 'mysql',
  hostname      : process.env.DB_HOST || 'localhost',
  username      : process.env.DB_USER,
  password      : process.env.DB_PASSWORD,
  database      : process.env.DB_NAME
}