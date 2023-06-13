const express = require("express")
require("dotenv").config()

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to PicPerfect!!!")
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("Database is connected")
    } catch(err) {
        console.log(err.message)
        console.log("Database is not connected")
    }   
    console.log("Server is running...")
})