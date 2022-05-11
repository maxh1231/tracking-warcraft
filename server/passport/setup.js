const { User } = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID
var BNET_SECRET = process.env.BNET_SECRET

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
            const user = await User.findOne({ email: username })
            if (!user) {
                return done(null, false, { message: 'No user found!!'})
            } else {
                const validPassword = await user.isCorrectPassword(password);
                if (!validPassword) {
                    return done(null, false, { message: 'wrong password'})
                } else {
                    return done(null, user)
                }
            }
        }
        catch(err) {
            return done(null, false, { message: err });
        };
    })
);

// Battle.net Strategy
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "http://localhost:3000/",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    return done(null, profile);
}));

module.exports = passport;