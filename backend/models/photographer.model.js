const mongoose = require("mongoose")

const PhotographerSchema = mongoose.Schema({

})

const PhotographerModel = mongoose.model("Photographers", PhotographerSchema)

module.exports ={PhotographerModel}


// User
//     - id: (int)
//     - name: (string)
//     - email: (string)
//     - password: (string)

// Photographer
//     - id: (int)
//     - name: (string)
//     - email: (string)
//     - password: (string)
//     - expertise: (string)
//     - availability: (array)

// Booking
//     - id: (int)
//     - customerId: (int)
//     - photographerId: (int)
//     - appointmentTime: (string)
//     - notes: (string)