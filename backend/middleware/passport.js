import User from '../models/userModel.js'
import config from 'config'
import { Strategy, ExtractJwt } from 'passport-jwt'

const jwtSecret = config.get('jwtSecret')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

export const passportMiddleware = (passport) => {
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
