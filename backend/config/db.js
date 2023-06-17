const mongoose = require("mongoose");
const  {createClient }  = require('redis');
require("dotenv").config();

// Connect to MongoDB using Mongoose
const connection = mongoose.connect(process.env.MONGO_URL);

// Create Redis client
function createRedisClient() {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  // Handle Redis client errors
  client.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

  return client;
}



module.exports = {
  connection,
  createRedisClient
};