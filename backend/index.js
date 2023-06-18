const express = require("express");
const { connection , createRedisClient} = require("./config/db");

const { adminrouter } = require("./routes/admin.route");

// const { logger } = require("./middlewares/logger");
const { userRoute } = require("./routes/user.route");


const { BookingRouter } = require("./routes/booking.route");
const { authRoute } = require("./routes/auth.route");

const cors = require("cors");
const { authMiddleWare } = require("./middlewares/auth");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// app.use("/admin",adminrouter)

app.get("/", async (req, res) => {
  try {
    res.send({ ok: true, msg: "Welcome to Backend of Pic Perfect" });
  } catch (error) {
    res.send({ ok: false, msg: error.message });
  }
});
// app.use(authMiddleWare)
app.use("/user", userRoute);

app.use("/auth", authRoute);
app.use("/book", BookingRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb Database");

    const redisClient = createRedisClient(); // Obtain Redis client instance

    redisClient.on("connect", () => {
      console.log("Connected to Redis Database");
    });

    redisClient.on("error", (error) => {
      console.error("Redis connection error:", error);
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
    console.log("Database not Connected");
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
