
const googleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
const moment = require('moment');

const passport = (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        const createObj = {createdAt: moment().toDate(), createdUnixTime: moment().valueOf(),createdDateStr: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
        createObj.googleId = newUser.googleId
        createObj.displayName = newUser.displayName
        createObj.firstName = newUser.firstName
        createObj.lastName = newUser.lastName
        createObj.image = newUser.image


        try {
            let user = await db.collection('user').findOne({ googleId: profile.id })

            if(user) {
                done(null, user);
            } else {
                user = await db.collection('user').updateOne(newUser, {$set: createObj})
                done(null, user)
            }
        } catch(err){
            console.error(err.message);
        }
    }))

    passport.serializeUser(function (user, done){
        done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done){
        db.collection('user').findById(id, function(err, user) {
            done(err, user);
        })
    })
}

module.exports = passport