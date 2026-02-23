import Booking from "../models/booking.js";
import Room from "../models/room.js";

export const getWebBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings); 
  } catch (error) {
    console.error("Error fetching bookings:", error); // ye console me dikhega
    res.status(500).json({ message: "Server error" });
  }
};
export const addWebBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomType,
      payment,
      requests,
    } = req.body;

    if (!name || !email || !phone || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

  const newBooking = new Booking({
  name,
  email,
  phone,
  checkIn: new Date(checkIn),
  checkOut: new Date(checkOut),
  guests,
  roomType,
  payment,
  requests,
});

    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};