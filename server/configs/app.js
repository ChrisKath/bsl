require('dotenv').config()

module.exports = {
  appName       : process.env.npm_package_name,
  production    : process.env.APP_MODE === 'production',
  port          : process.env.APP_MODE === 'production' ? 443 : 3000,
  apiVersion    : process.env.API_VERSION || 1,
  apiKey        : process.env.API_SECRET_KEY || '',
  tokenExpiry   : process.env.JWT_TTL || '1d',
  secretKey     : process.env.JWT_SECRET || '',
  shortkeyLength: process.env.APP_SHORTKEY || 6,
  
  dialect       : process.env.DB_DIALECT || 'mysql',
  hostname      : process.env.DB_HOST || 'localhost',
  database      : process.env.DB_NAME,
  username      : process.env.DB_USER,
  password      : process.env.DB_PASSWORD
}