// const passport = require("passport");
// const { User } = require("../models/user.model");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8185/auth/google/callback",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       const { name, email, picture } = profile._json;
//       console.log(name,email,picture);
//       const userData = await User.findOne({ email });
//       if (userData != null) {
//         return cb(null, userData);
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           picture,
//         });
//         await newUser.save();
//         return cb(null, newUser);
//       }
//     }
//   )
// );

// module.exports = { passport };
