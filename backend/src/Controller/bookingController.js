import Booking from "../models/booking.js";
import Room from "../models/room.js";

// Add Booking
export const addBooking = async (req, res) => {
  try {
    const { customer, room, checkIn, checkOut, status } = req.body;

    // Validate dates
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }

    // Check if room is already booked for selected dates
    const existingBooking = await Booking.findOne({
      room,
      status: { $ne: "Cancelled" },
      $or: [
        {
          checkIn: { $lte: checkOut },
          checkOut: { $gte: checkIn },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Room already booked for selected dates",
      });
    }

    const booking = await Booking.create({
      customer,
      room,
      checkIn,
      checkOut,
      status,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      // Populate room with only number and type
      // .populate("room", "number type")
      // Sort newest first
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Booking By ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customer")
      .populate("room");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Booking
export const updateBooking = async (req, res) => {
  try {
    const { customer, room, checkIn, checkOut, status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.customer = customer || booking.customer;
    booking.room = room || booking.room;
    booking.checkIn = checkIn || booking.checkIn;
    booking.checkOut = checkOut || booking.checkOut;
    booking.status = status || booking.status;

    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
