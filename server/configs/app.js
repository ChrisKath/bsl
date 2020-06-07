require('dotenv').config()

module.exports = {
  port          : process.env.PORT || 3000,
  isProduction  : process.env.NODE_ENV === 'production',
  apiVersion    : process.env.API_VERSION || 1,
  tokenExpDays  : process.env.TOKEN_EXP_DAYS || 360,
  secretKey     : process.env.SECRET_KEY || '',
  
  dialect       : process.env.DB_DIALECT || 'mysql',
  hostname      : process.env.DB_HOST || 'localhost',
  username      : process.env.DB_USER,
  password      : process.env.DB_PASSWORD,
  database      : process.env.DB_NAME,
}