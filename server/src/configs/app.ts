import * as dotenv from 'dotenv'

// initialize configuration
dotenv.config()

export let appName      = process.env.APP_NAME || 'project_bsl';
export let port         = process.env.NODE_ENV === 'production' ? 443 : 3000;
export let isProduction = process.env.NODE_ENV === 'production';
export let apiVersion   = process.env.API_VERSION || 1;
export let apiKey       = process.env.API_SECRET_KEY || '';
export let tokenExpiry  = process.env.JWT_TTL || '1d';
export let secretKey    = process.env.JWT_SECRET || '';
export let keyLength    = process.env.KEY_LENGTH || 6;
export let dialect      = process.env.DB_DIALECT || 'mysql';
export let hostname     = process.env.DB_HOST || 'localhost';
export let database     = process.env.DB_NAM;
export let username     = process.env.DB_USER;
export let password     = process.env.DB_PASSWORD;