const express=require("express")
const adminrouter=express.Router()

const {adminmodel}=require("../models/admin.model")

adminrouter.post("/addadmin",async(req,res)=>{
    try {
        const data=req.body
        const newadmin=new adminmodel(data)
        await newadmin.save()
        res.status(200).send("Admin added")
    } catch (error) {
        console.log(error)
    }
})

adminrouter.get("/getadmin",async(req,res)=>{
    try {
        let admindata=await adminmodel.find()
        res.status(200).send(admindata)
    } catch (error) {
        console.log(error)
    }
    })

    adminrouter.patch("/update/:id",async(req,res)=>{
        const {id}=req.params

        try {
            await adminmodel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({msg:"Admin updated!"})
        } catch (error) {
            console.log(error)
        }
    })

    

    module.exports={adminrouter}