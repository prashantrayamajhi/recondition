const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Users = require("../models/User.js");

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      Users.findById(jwt_payload.userId).then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
