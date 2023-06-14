const {PhotographerModel} = require("../models/photographer.model")

const GetAllData = async (req, res) => {
    try {
      const allData = await PhotographerModel.find({ })
      res.json(allData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

const CreateData = async (req, res) => {
 
  const { name, img, location, expertise, phone_no,availability,amount,rating,description} = req.body;
    try {
      const newData = new PhotographerModel({
        name,
        img,
        location,
        expertise,
        phone_no,
        availability,
        amount,
        rating,
        description
       
        
      })
      const savedData = await newData.save()
      res.status(201).json(savedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  module.exports= {GetAllData,CreateData}