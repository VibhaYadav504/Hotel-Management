import Booking from "../models/booking.js";
import Customer from "../models/customer.js";
import Room from "../models/room.js";
import Staff from "../models/staff.js";

export const getStats = async (req, res) => {
  try {
    const staffCount = await Staff.countDocuments();
    const roomCount = await Room.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const customerCount = await Customer.countDocuments();

    res.json({
      staff: staffCount,
      rooms: roomCount,
      bookings: bookingCount,
      customers: customerCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    res.status(500).json({ message: "Server error" });
  }
};