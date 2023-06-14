const mongoose = require("mongoose")

const PhotographerSchema = mongoose.Schema({
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
        type
    }
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