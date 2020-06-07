const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { secretKey } = require('../configs/app')
const UserModel = require('../models/User')

// Login.
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await UserModel.findOne({
      where: { [Op.or]: [{ email: username }, { username }] }
    })

    // if user not exist than return status 400
    if (!user) return done(null, false, {
      status: false,
      message: 'Email or Username is invalid.'
    })

    // if user exist than compare password
    // password comes from the user
    // user.password comes from the database
    const bcryptAttempt = bcrypt.compareSync(password, user.password.replace(/^\$2y/, '$2b'))
    if (!bcryptAttempt) done(null, false, {
      status: false,
      message: 'This password is invalid.'
    })

    done(null, user)
  } catch (error) {
    done(null, false, error)
  }
}))

// Middleware
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : secretKey
}, async (payload, done) => {
  // find the user in db if needed.
  // This functionality may be omitted if you store everything you'll need in JWT payload.
  try {
    const user = await UserModel.findOneById(payload.id)
    return done(null, user)
  } catch (error) {
    return done(null, false, error)
  }
}))