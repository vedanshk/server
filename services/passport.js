const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    User.findById({ _id:id }).then(user => {

        done(null, user);

    });

});




const GoogleStrategy = require('passport-google-oauth20').Strategy;


const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;



passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id }).then((existingUser) => {

        if (existingUser) {

            // we already have a record with the googleId
            done(null, existingUser);

        } else {

            const user = new User({ googleId: profile.id });

            user.save().then((user) => {

                done(null, user);

            });

        }

    })


}));

