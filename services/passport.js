const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const User = mongoose.model('users');

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    User.findById({ id }).then(user => {

        done(null, user);

    });

});




const GoogleStrategy = require('passport-google-oauth20').Strategy;


const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;



passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id }).then((user) => {

        if (user) {

            // we already have a record with the googleId
            done(null, user);

        } else {

            const user = new User({ googleId: profile.id });

            user.save().then((existingUser) => {

                done(null, existingUser);

            });

        }

    }).catch(err => {

        done(err, false);


    });


}));

