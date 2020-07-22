import dotenv from 'dotenv'
dotenv.config()

export const appName: string = process.env.APP_NAME || 'unset'
export const production: boolean = process.env.APP_MODE === 'production'
export const port: number = process.env.APP_MODE === 'production' ? 443 : 3000
export const apiVersion: string = process.env.API_VERSION || '1'
export const apiKey: string = process.env.API_SECRET_KEY || ''
export const tokenExpiry: string = process.env.JWT_TTL || '1d'
export const secretKey: string = process.env.JWT_SECRET || ''
export const shortkeyLength: number = Number(process.env.APP_SHORTKEY || 6)