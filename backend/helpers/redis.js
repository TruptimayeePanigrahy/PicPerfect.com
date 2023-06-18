const redis = require("ioredis");
require("dotenv").config();

let configuration = {
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};

const redisClient = new redis(configuration);

module.exports = { redisClient };