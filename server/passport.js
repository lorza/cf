const passport = require("passport");
const {User} = require("./models/User");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./config");

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: config.authentication.jwtSecret
    }, async function (jwtPayload, done) {
        
    })
)