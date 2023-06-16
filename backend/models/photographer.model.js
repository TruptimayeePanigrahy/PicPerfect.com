const mongoose = require("mongoose");

const PhotographerSchema = mongoose.Schema({

    
  name: { type: String, required: true },

  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
  img3: {
    type: String,
  },

    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    expertise: {
        type: String,
        required: false,
    },
    availability: {
        type:Boolean,
        required:true
    }
})

const PhotographerModel = mongoose.model("Photographer",PhotographerSchema)

module.exports={PhotographerModel}