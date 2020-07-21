import { appName, secretKey, shortkeyLength, tokenExpiry } from '@/configs/app'
import jwt from 'jsonwebtoken'
import moment from 'moment'

/**
 * Generate Json Web Token.
 * 
 * @param {object} user
 */
export function createToken (user: any): any {
  const token: string = jwt.sign({
    iss: appName,
    uid: user.id,
    sub: user.employeeCode
  }, secretKey, { expiresIn: tokenExpiry })
  
  return {
    token,
    type: 'Bearer',
    expires: moment().add(Number(tokenExpiry[0]), tokenExpiry[1]).toISOString()
  }
}

/**
 * Create random keyCode generator.
 */
export function createKeyCode (): string {
  return Math.random()
    .toString(36)
    .substr(2, shortkeyLength)
}