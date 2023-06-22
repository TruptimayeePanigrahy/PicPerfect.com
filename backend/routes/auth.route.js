const express = require("express");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const { UserModel } = require("../models/user.model");
// const passportFacebook = require("passport");
const passportGithub = require("passport");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

const authRoute = express.Router();


// Google Oauth
authRoute.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
    "/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function (req, res) {
        let user = req.user;
        const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1hr' })

        res.redirect(`https://localhost:8185/dashboard.html?id=${user._id}&token=${token}&role=${user.role}&approved=${user.approved}&username=${user.name}`); // chnge the link to frontend
    }
);

authRoute.get("/google/failure", (req, res) => {
    // res.redirect("https://bookmyshoot.netlify.app/login.html")
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://localhost:8185/auth/google/callback", // change the callback link
            passReqToCallback: true
        },
        async function (request, accessToken, refreshToken, profile, cb) {
            let email = profile._json.email;
            let udata = await UserModel.findOne({ email });
            if (udata) {
                return cb(null, udata);
            }
            let name = profile._json.name;

            const user = new UserModel({
                name,
                email,
                pass: uuidv4(),
            });
            await user.save();
            return cb(null, user);
        }
    )
);

// Github Oauth
// authRoute.get(
//     "/github",
//     passportGithub.authenticate("github", { scope: ["user:email"] })
// );

// authRoute.get(
//     "/github/callback",
//     passportGithub.authenticate("github", {
//         failureRedirect: "/login",
//         session: false,
//     }),
//     function (req, res) {
//         let user = req.user;
//         const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1hr' })

//         res.redirect(`https://bookmyshoot.netlify.app/dashboard.html?id=${user._id}&token=${token}&role=${user.role}&approved=${user.approved}&username=${user.name}`);
//     }
// );

// authRoute.get("/github/failure", (req, res) => {
//     res.redirect("https://bookmyshoot.netlify.app/login.html")
// })

// passportGithub.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET,
//             callbackURL: "https://bookmyshoot-backend.onrender.com/auth/github/callback",
//             scope: "user:email",
//         },
//         async function (request, accessToken, refreshToken, profile, done) {
//             let email = profile.emails[0].value;

//             let udata = await UserModel.findOne({ email });
//             if (udata) {
//                 return done(null, udata);
//             }
//             let name = profile._json.name;

//             const user = new UserModel({
//                 name,
//                 email,
//                 pass: uuidv4(),
//             });
//             await user.save();
//             return done(null, user);
//         }
//     )
// );




module.exports = {
    authRoute
}