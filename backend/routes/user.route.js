const express = require("express");
const { UserModel } = require("../models/user.model");
const { Image } = require("../models/image.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const passport = require("passport");
const nodemailer = require("nodemailer");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const tokenList = {};
const session = require("express-session");
express.json();
require("dotenv").config();
const userRoute = express.Router();
//Set up multer
const multer = require("multer");
const { authMiddleWare } = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

//Route for uploading the images
userRoute.post(
  "/upload",
  upload.single("image"),
  authMiddleWare,
  async (req, res) => {
    const image = new Image({
      name: req.file.originalname,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        userID: req.user._id, // adding userid in the image
      },
    });

    await image.save();
    console.log("hhhh");
    res.send({ message: "image uploaded" });
  }
);

//Route for updating the details
userRoute.patch(
  "/submit_photographer_details",
  authMiddleWare,
  async (req, res) => {
    const payload = req.body;
    try {
      await UserModel.findByIdAndUpdate({ _id: req.user._id }, payload);
      res.send({ message: "success" });
    } catch (err) {
      console.log(err);
    }
  }
);

//Route for getting the images with userID

userRoute.get("/images", async (req, res) => {
  const photographers = await UserModel.find({ approved: true });
  const images = await Image.aggregate([
    {
      $group: {
        _id: "$image.userID",
        images: {
          $push: {
            _id: "$image.data",
            content_type: "$image.contentType",
          },
        },
      },
    },
  ]);
  res.send({ images, photographers });
});

// Route for getting the Photographers sorted by price and filtered by location
userRoute.get("/SortByPrice", async (req, res) => {
  let query = {};
  let sortby = { price: 0 };
  query.approved = true;
  if (req.query.location) {
    query.address = req.query.location;
  }
  if (req.query.Sortby) {
    if (req.query.Sortby == "asc") {
      sortby["price"] = 1;
    } else {
      sortby["price"] = -1;
    }
  }
  const photographers = await UserModel.find(query).sort(sortby);
  const images = await Image.aggregate([
    {
      $group: {
        _id: "$image.userID",
        images: {
          $push: {
            _id: "$image.data",
            content_type: "$image.contentType",
          },
        },
      },
    },
  ]);

  res.send({ images, photographers });
});

// route for getting photos of individual photographers

userRoute.get("/images/:id", async (req, res) => {
  const photographers = await UserModel.find({
    _id: req.params.id,
    approved: true,
  });
  const images = await Image.aggregate([
    {
      $group: {
        _id: "$image.userID",
        images: {
          $push: {
            _id: "$image.data",
            content_type: "$image.contentType",
          },
        },
      },
    },
  ]);

  const Images = images.filter(function (image) {
    return image._id === req.params.id;
  });

  res.send({ Images, photographers });
});

userRoute.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send(data);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

userRoute.post("/register", async (req, res) => {
  const { name, email, pass, role } = req.body;
  const check = await UserModel.find({ email });
  if (check.length > 0) {
    return res.status(200).json({ ok: false, msg: "User already exist" });
  }
  bcrypt.hash(pass, 5, async (err, hash) => {
    try {
      const data = new UserModel({ name, email, pass: hash, role });
      await data.save();
      sendverificationmail(data.name, data.email, data._id);
      res.status(200).send({
        msg: "User Registration Successfull. Please verify Your Email Address.",
      });
      res.status(200).json({ ok: true, msg: "Registered Successfully" });
    } catch (error) {
      res.status(400).json({ ok: false, msg: error.message });
    }
  });
});

let sendverificationmail = async (name, email, userid) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kothawaderitesh2010.com",
        pass: process.env.googlepassword,
      },
    });

    const BaseUrl_Backend = `https://angry-cummerbund-newt.cyclic.app`;

    let mailOptions = {
      from: "kothawaderitesh2010.com",
      to: email,
      subject: "User Verifecation Mail From Pic Perfect",
      html: `<p>hi ${name} <br> Please click here to <a href="${BaseUrl_Backend}/user/verify?id=${userid}">verify</a>  your mail. </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

userRoute.get("/verify", async (req, res) => {
  try {
    let { id } = req.query;
    let userverify = await UserModel.findOne({ _id: id });

    if (!userverify) {
      return res.status(400).send({ msg: "not valid email" });
    }

    userverify.ismailverified = true;
    await userverify.save();
    res.status(200).send({ msg: "mail verified successfull" });
  } catch (error) {
    console.log(error);
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, pass } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "User with this email not found", ok: false });
    }
    const isPasswordSame = await bcrypt.compare(pass, user.pass);
    console.log(isPasswordSame);
    if (!isPasswordSame) {
      return res
        .status(401)
        .json({ msg: "Invalid email or password", ok: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.secret, {
      expiresIn: "1hr",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.refresh_secret,
      { expiresIn: "3hr" }
    );
    const response = {
      ok: true,
      token: token,
      refreshToken: refreshToken,
      msg: "Login Successfull",
      role: user.role,
      approved: user.approved,
      id: user._id,
      userName: user.name,
    };
    tokenList[refreshToken] = response;
    req.user = user;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
    console.log(error);
  }
});

let sendotpmail = async (name, email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kothawaderitesh2010.com",
        pass: process.env.googlepassword,
      },
    });

    let mailOptions = {
      from: "kothawaderitesh2010.com",
      to: email,
      subject: "OTP verifecation mail",
      html: `<p>HI ${name} <br> please use this OTP to update password.<br> ${otp} </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

userRoute.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  // Verifying the JWT token
  jwt.verify(token, "ourSecretKey", function (err, decoded) {
    if (err) {
      console.log(err);
      res.send(
        "Email verification failed, possibly the link is invalid or expired"
      );
    } else {
      res.send("Email verifified successfully");
    }
  });
});

userRoute.post("/forgetpass", async (req, res) => {
  try {
    let { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += Math.floor(Math.random() * 10);
      }
      console.log(OTP);
      client.set("OTP", OTP, "EX", 3600);
      sendotpmail(user.name, user.email, OTP);
    }
    res.send({ userdetails: user });
  } catch (error) {
    console.log(error);
  }
});

userRoute.post("/verifyotp", async (req, res) => {
  try {
    let { OTP } = req.body;
    let otp = await client.get("OTP");
    if (OTP == otp) {
      res.status(200).send({ msg: "Otp verified" });
    } else {
      res.status(400).send({ msg: "incorrect verified" });
    }
  } catch (error) {
    console.log(error);
  }
});

userRoute.put("/updatepass", async (req, res) => {
  try {
    let { id } = req.query;
    let { pass } = req.body;
    let hashpass = bcrypt.hashSync(pass, 5);
    let user = await UserModel.findById({ _id: id });
    user.pass = hashpass;
    await user.save();
    console.log(user);
    res.send({ msg: "password update successfull please login" });
  } catch (error) {
    res.send(error);
  }
});

userRoute.post("/apply", authMiddleWare, async (req, res) => {
  const { name, email, camera, expertise, address, samplePics } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found", ok: false });
    }
    user.name = name;
    user.email = email;
    user.camera = camera;
    user.expertise = expertise;
    user.address = address;
    user.samplePics = samplePics;
    user.approved = false;
    user.role = "photographer";
    await user.save();
    res.json({ msg: "Application submitted successfully", ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", ok: false });
  }
});

userRoute.get("/pending", authMiddleWare, async (req, res) => {
  try {
    const users = await UserModel.find({
      role: "photographer",
      approved: false,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRoute.patch(
  "/applications/:email",
  authMiddleWare,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { email } = req.params;
      const { approved } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(404).send({ error: "User not found" });
      } else if (user.role !== "photographer") {
        res.status(400).send({ error: "User is not a photographer" });
      } else {
        // user.approved = approved;
        console.log("working");
        await UserModel.findOneAndUpdate(
          { email: email },
          { approved: approved }
        );
        res.send({ message: "Photographer application updated successfully" });
      }
      // console.log(user)
    } catch (err) {
      res.status(500).send({ error: "Server Error", err });
    }
  }
);
userRoute.use(
  session({
    secret: "dancingCar",
    resave: false,
    saveUninitialized: false,
  })
);
userRoute.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: "Logged out successfully" });
    }
  });
});

// Info of a particular user

userRoute.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.params.id });
    const {
      name,
      email,
      role,
      approved,
      camera,
      expertise,
      address,
      price,
      _id,
    } = user;
    res.send({
      ok: true,
      user: {
        name,
        email,
        role,
        approved,
        camera,
        expertise,
        address,
        price,
        _id,
      },
    });
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
});

userRoute.post(
  "/block/:userId",
  authMiddleWare,
  checkRole("admin"),
  async (req, res) => {
    try {
      // Find the user by ID and update their `blocked` field to `true`
      const user = await UserModel.findByIdAndUpdate(req.params.userId, {
        isBlocked: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.json({ ok: true, message: "User blocked Successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);
module.exports = {
  userRoute,
  checkRole,
};
