const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    name: String,
    image: {
      data: Buffer,
      contentType: String,
      userID:String
    },
  });


const Image = mongoose.model('Image', imageSchema);

module.exports = {
    Image
}
