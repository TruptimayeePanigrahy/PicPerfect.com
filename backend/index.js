const express = require("express");
const { connection, client } = require("./config/db");

const { userRoute } = require("./routes/user.route");


const { BookingRouter } = require("./routes/booking.route")
const {adminrouter}=require("./routes/admin.route")
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/admin",adminrouter)


app.get("/", (req, res) => {
  try {
    res.send({ "ok": true, "msg": "Welcome to Backend of Book My Shoot" });
  } catch (error) {
    res.send({ "ok": false, "msg": error.message })
  }
})
// app.use("/user", userRoute);



// app.use("/auth", authRoute);
// app.use("/book", BookingRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb Database");
    await client.connect();
    console.log("Connected to Redis Database");
  } catch (error) {
    console.log(error.message);
    console.log("Database not Connected");
  }
  console.log(`Server is running at port ${process.env.PORT}`);
})