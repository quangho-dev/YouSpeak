const User = require('../models/userModel')
const config = require('config')
const { Strategy, ExtractJwt } = require('passport-jwt')

const jwtSecret = config.get('jwtSecret')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

const passportMiddleware = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => {
          return done(null, false)
        })
    })
  )
}

module.exports = { passportMiddleware }
