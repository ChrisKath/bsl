const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { secretKey } = require('../configs/app')
const Users = require('../models/User')

// Auth Required Middleware.
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : secretKey
}, async (payload, done) => {
  try {
    // find the user specified in token.
    const user = await Users.findOne({
      where: {
        id: payload.sub,
        isActive: true
      },
      attributes: {
        exclude: ['password', 'createdBy', 'updatedBy']
      }
    })

    // if user doesn't exists, handle it.
    if (!user) {
      return done(null, false)
    }
    
    // Otherwise, return the user.
    return done(null, user)
  } catch (error) {
    done(error, false)
  }
}))