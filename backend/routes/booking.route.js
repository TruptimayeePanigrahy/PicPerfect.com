const express = require("express");
const { UserModel } = require("../models/user.model");
const BookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model")
const { NotificationModel } = require("../models/notification.model")
const { MeetingModel } = require("../models/meeting.model");
const { authMiddleWare } = require("../middlewares/auth")
const { checkRole } = require("../routes/user.route")
const moment = require("moment");
BookingRouter.get("/", async (req, res) => {
  try {
    let data = await BookingModel.find().populate("photographer client","name");
    res.send({ data, ok: true });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message, ok: false });
  }
});
BookingRouter.post('/book', authMiddleWare,async (req, res) => {
  const { photographerId, startTime, endTime } = req.body;

  try {
    // Check if photographer and client exist in the database
    const photographer = await UserModel.findById(photographerId);
    if (!photographer){
      return res.status(400).json({ message: 'Invalid photographer or client ID', ok:false });
    }
    // Create the booking
    const booking = new BookingModel({
      photographer: photographerId,
      client: req.user.id,
      start_time: new Date(startTime),
      end_time: new Date(endTime),
    });
    // Save the booking to the database
    await booking.save();
    return res.status(201).json({ message: 'Booking request sent successfully', ok:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, ok:false });
  }
});
// {
//   "photographerId":"6455cdf70851601e639bba63",
//   "startTime":"2025-06-01T10:00:00.000Z",
//   "endTime":"2025-06-01T19:00:00.000Z"
// }

// Retrieve all booking requests for a specific photographer
BookingRouter.get('/requests/:status', authMiddleWare, async (req, res) => {
  try {
    // Get the logged-in photographer's ID
    const photographerId = req.user.id;
    // Find all booking requests for the logged-in photographer from the database
    const bookings = await BookingModel.find({ photographer: photographerId, status: req.params.status }).populate('client', 'name email');
    res.json({ ok: true, bookings });
  } catch (err) {
    res.status(500).send({ error: err.message, mssg: 'Server Error', ok: false });
  }
});

// Retrieve all booking requests for a specific client
BookingRouter.get('/requests', authMiddleWare, async (req, res) => {
  try {
    // Get the logged-in client's ID
    const clientId = req.user.id;
    // Find all booking requests for the logged-in photographer from the database
    const bookings = await BookingModel.find({ client: clientId }).populate('photographer', 'name email');
    res.json({ ok: true, bookings });
  } catch (err) {
    res.status(500).send({ error: err.message, mssg: 'Server Error', ok: false });
  }
});

// Route to accept or reject a booking request
BookingRouter.post('/requests/:bookingid', authMiddleWare, async (req, res) => {
  try {
    const { bookingid } = req.params;
    const { status, Notification } = req.body;
    // Check if the photographer is authorized to accept or reject the booking request
    const booking = await BookingModel.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (!booking.photographer.equals(req.user._id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    // Update the booking status
    booking.status = status;
    await booking.save();
    // Send a notification to the user
    const notification = new NotificationModel({
      to: booking.client,
      from: req.user._id,
      booking: booking._id,
      message: Notification,
    });
    await notification.save();
    res.json({ ok: true, msg: "Booking updated and notification sent succcessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: err.message });
  }
});
BookingRouter.post('/:bookingId/notifications', authMiddleWare, async (req, res) => {
  try {
    const { message } = req.body;
    const { bookingId } = req.params;
    const { id: from } = req.user;

    // Find the booking and make sure the logged in user is the associated photographer
    const booking = await BookingModel.findOne({ _id: bookingId, photographer: from });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create the notification and save it to the database
    const notification = new NotificationModel({ from, to: booking.client, booking: booking._id, message });
    await notification.save();
    res.json({ ok: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// GET /notifications
BookingRouter.get('/notifications', authMiddleWare, async (req, res) => {
  try {
    // Find all notifications sent to the user
    const notifications = await NotificationModel.find({ to: req.user.id }).populate('from').populate('booking');
    const messages = notifications.map(notification => notification.message)
    res.json({ ok: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error.message });
  }
});

BookingRouter.post('/meeting/create', async (req, res) => {
  try {
    const { msg, photographer, link,name } = req.body;
    const data = await MeetingModel.findOne({ photographer });
    const obj = {
      msg,
      link,
      name
    }
    // console.log(data);
    if(!data){
      var newData = new MeetingModel({
        photographer,
        meetings:[]
      })
      newData.meetings.push(obj);
      await newData.save();
    } else {
      data.meetings.push(obj);
      await data.save();
    }
    res.json({ ok: true, msg: "Meeting created successfully" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
})

BookingRouter.get('/:photographerId', async(req,res)=>{
  try {
    const data = await MeetingModel.findOne({photographer:req.params.photographerId})
    res.json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
})

module.exports = {
  BookingRouter
}