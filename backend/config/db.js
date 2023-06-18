const mongoose = require("mongoose");
const  {createClient }  = require('redis');
require("dotenv").config();

// Connect to MongoDB using Mongoose
const connection = mongoose.connect(process.env.MONGO_URL);

// Create Redis client
function createRedisClient() {
  const client = createClient({
    url:"redis://default:hjyrhdODecuRN9K7Jfa53RjwrtbAr0ry@redis-15375.c301.ap-south-1-1.ec2.cloud.redislabs.com:15375"
  });

  // Handle Redis client errors
  client.on('error', (error) => {
    console.error('Redis connection error:', error);
  });
  return client;
}

module.exports = {
  connection,
  createRedisClient,
};
