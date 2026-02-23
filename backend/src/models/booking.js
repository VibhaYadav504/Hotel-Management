import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  payment: String,
  requests: String,
  status: { type: String, default: "Pending" }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;