import PassportJwt from 'passport-jwt';
import { noteSchema } from '../models/Note.js';
import config from './config.json';

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

export const findUserWithJwtPayloadId = passport => {

  const opts = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

  const UserNote = noteSchema;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    UserNote.findOne({ _id: jwt_payload._id }, (err, user) => {

      if (err) {
        return done(err, false)
      }

      if (user) {
        return done(null, user);
      }

      done(null, false);
    });
  }));
};
