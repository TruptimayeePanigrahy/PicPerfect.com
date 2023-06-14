const mongoose = require("mongoose")

const UserSchema =  mongoose.Schema({

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
      role: {
        type: String,
        enum: ['photographer', 'admin', 'user'],
        default: 'user'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }

})

const UserModel = mongoose.model("Users", UserSchema)

module.exports ={UserModel}


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