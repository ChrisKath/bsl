import * as dotenv from 'dotenv'

// initialize configuration
dotenv.config()

export default {
  appName      : process.env.npm_package_name,
  port         : process.env.APP_MODE === 'production' ? 443 : 3000,
  isProduction : process.env.APP_MODE === 'production',
  apiVersion   : process.env.API_VERSION || 1,
  apiKey       : process.env.API_SECRET_KEY || '',
  tokenExpiry  : process.env.JWT_TTL || '1d',
  secretKey    : process.env.JWT_SECRET || '',
  keyLength    : process.env.KEY_LENGTH || 6,
  dialect      : process.env.DB_DIALECT || 'mysql',
  hostname     : process.env.DB_HOST || 'localhost',
  database     : process.env.DB_NAM,
  username     : process.env.DB_USER,
  password     : process.env.DB_PASSWORD
}