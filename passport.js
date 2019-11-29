const mongoose = require('mongoose');
const User = mongoose.model('User');
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config/authKeys');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL
    }, function(accessToken, refreshToken, profile, done) {

        User.findOne({ provider_id: profile.id }, function(err, user) {
            if (err) throw (err);

            if (!err && user != null) return done(null, user);


            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });

            user.save(function(err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));


    passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', /*'provider',*/ 'photos']
    }, function(accessToken, refreshToken, profile, done) {

        User.findOne({ provider_id: profile.id }, function(err, user) {
            if (err) throw (err);
            if (!err && user != null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function(err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));

};