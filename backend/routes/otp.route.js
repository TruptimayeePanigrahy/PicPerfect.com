const express = require('express');
const jwt = require('jsonwebtoken');

const otpRouter = express()

otpRouter.use(express.json);

otpRouter.get('/',(req,res)=>{
    res.send("Otp here!")
})

otpRouter.get('/forgot-password',(req,res)=>{
    res.render("forgot-password")
})

otpRouter.post('/forgot-password',(req,res)=>{
    const {email} = req.body;
    res.send(email);
})

otpRouter.get('/reset-password',(req,res,next)=>{

})

otpRouter.post('/reset-password',(req,res,next)=>{

})

module.exports = {otpRouter}