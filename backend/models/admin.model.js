const mongoose=require("mongoose")

const adminschema=mongoose.Schema({
    Image:String,
    name:String,
    mobile:String,
    address:String,
    email:String
})

const adminmodel=mongoose.model("admin",adminschema)

module.exports={adminmodel}