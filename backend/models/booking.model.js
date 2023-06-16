const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending'
  }
});
const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = {
  BookingModel
}
