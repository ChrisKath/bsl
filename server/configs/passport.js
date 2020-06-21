const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { secretKey } = require('../configs/app')
const { users } = require('../configs/databases')

// Auth Required Middleware.
passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey   : secretKey
}, async (payload, done) => {
  try {
    // find the user specified in token.
    const user = await users.findByPk(payload.uid, {
      attributes: {
        exclude: ['password', 'createdBy', 'updatedBy']
      }
    })

    // if user doesn't exists, handle it.
    if (!user) {
      return done(null, false)
    }

    // Suspended.
    if (!user.activated) {
      return done({
        message: 'Your account has been suspended.'
      }, false)
    }

    // Otherwise, return the user.
    return done(null, user)
  } catch (error) {
    done(error, false)
  }
}))