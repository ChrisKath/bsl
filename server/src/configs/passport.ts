import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { createQueryBuilder } from 'typeorm'
import { secretKey } from '../configs/app'
import { User } from '../database'

// Auth required middleware
passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey   : secretKey
}, async (payload, done): Promise<any> => {
  try {
    // Gatter the user specified in token
    const user = await createQueryBuilder(User, 'user')
      .select([
        'user.id',
        'user.employeeCode',
        'user.username',
        'user.activated'
      ])
      .where('user.id = :id', { id: payload.uid })
      .getOne()

    // if user doesn't exists, handle it
    if (!user) {
      return done(null, false)
    }

    // Suspended
    if (!user.activated) {
      return done({
        message: 'Your account has been suspended.'
      }, false, 0)
    }

    // Otherwise, return the user
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))
