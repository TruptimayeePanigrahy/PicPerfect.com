const express = require("express")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {authMiddleware} = require("../middlewares/auth")
require("dotenv").config()
const userRouter = express.Router()

const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(401).json({ error: 'Access denied' });
      }
      next();
    }
}

userRouter.get("/", async (req, res) => {
    try {
      const data = await UserModel.find();
      res.send(data)
    } catch (error) {
      res.status(403).json({ error: error.message })
    }
})
  
userRouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const check = await UserModel.find({ email });
    if (check.length > 0) {
      return res.status(200).json({ "ok": false, "msg": "User already exist" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      try {
        const data = new UserModel({ name, email, password: hash, role });
        await data.save();
        res.status(200).json({ "ok": true, "msg": "Registered Successfully" });
      } catch (error) {
        res.status(400).json({ "ok": false, "msg": error.message });
      }
    });
})
  
userRouter.post("/login", async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User with this email not found", ok: false })
        }
        const isPasswordSame = await bcrypt.compare(password, user.password)
        if (!isPasswordSame) {
            return res.status(401).json({ msg: "Invalid email or password", ok: false })
        }
        const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1hr' })
        const refreshToken = jwt.sign({ userId: user._id }, process.env.refresh_secret, { expiresIn: "3hr" })
        const response = {
            "ok": true,
            "token": token,
            "refreshToken": refreshToken,
            "msg": "Login Successfull",
            "role": user.role,
            "approved": user.approved,
            "id": user._id,
            "userName": user.name
        }
        tokenList[refreshToken] = response
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ "ok": false, "msg": error.message });
    }
})

module.exports = {userRouter}
