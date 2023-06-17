const mongoose = require("mongoose");
// const { redisClient } = require("../helpers/redis.js");
const { createClient } = require("redis");
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO_URL);
const client = createClient({
  url: process.env.REDIS_URL,
});

module.exports = {
  connection,
  client,
};
