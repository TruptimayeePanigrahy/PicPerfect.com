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
        type:String,
        required:true
    }
})


//   location: { type: String, required: true },

//   expertise: { type: String, required: true },

//   phone_no: {
//     type: String,
//     required: true,
//   },

//   expertise: {
//     type: String,
//     enum: [
//       "Wedding",
//       "Babies & kid",
//       "Special Occasion",
//       "Commercial",
//       "Corporate Events",
//       "fashion & Protfolio",
//       "Nature",
//       "Travel",
//     ],
//   },
//   availability: {
//     type: Boolean,

//     required: true,
//   },
//   amount: {
//     type: Number,
//     require: true,
//   },
//   rating: {
//     type: Number,
//     require: true,
//   },
//   description: { type: String, 
//                  required: true
//                },
// });

const PhotographerModel = mongoose.model("Photographers", PhotographerSchema);

module.exports = { PhotographerModel };

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
