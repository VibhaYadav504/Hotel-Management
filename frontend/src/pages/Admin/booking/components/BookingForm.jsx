import React, { useEffect, useState } from "react";
import { getRoom } from "../../../../Service/Admin/RoomService";
import { addBooking, updateBooking } from "../../../../Service/Admin/BookingService";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ bookingData, onSubmit }) => {
  const [booking, setBooking] = useState({
    customer: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Pending",
  });

    const [rooms, setRooms] = useState([]);
const navigate = useNavigate();
 
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRoom();
        setRooms(data); 
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);


  useEffect(() => {
    if (bookingData) {
      setBooking(bookingData);
    }
  }, [bookingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  // Required fields check
  if (!booking.customer || !booking.room || !booking.checkIn || !booking.checkOut) {
    alert("Please fill all required fields!");
    return;
  }

  // Check-out must be after check-in
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  if (checkOutDate <= checkInDate) {
    alert("Check-out date must be after check-in date");
    return;
  }

  try {
    const payload = {
      ...booking,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };

    if (bookingData && bookingData._id) {
      await updateBooking(booking._id, payload);
      alert("Booking updated successfully!");
    } else {
      await addBooking(payload);
      alert("Booking added successfully!");
      setBooking({
        customer: "",
        room: "",
        checkIn: "",
        checkOut: "",
        status: "Pending",
      });
    }

    navigate("/admin/booking");
  } catch (error) {
    console.error(
      "Error saving booking:",
      error.response?.data || error.message
    );
    alert(
      "Something went wrong: " +
        (error.response?.data?.message || error.message)
    );
  }
};
 

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          {bookingData ? "Edit Booking" : "Add Booking"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Customer Name</label>
            <input
              type="text"
              name="customer"
              value={booking.customer}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Room</label>
            <select
              name="room"
              value={booking.room}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.number} - {room.type}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={booking.checkIn}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={booking.checkOut}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Status</label>
            <select
              name="status"
              value={booking.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-stone-900 font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              {bookingData ? "Update Booking" : "Add Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
