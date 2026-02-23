import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteBooking, getBooking } from "../../../../Service/Admin/BookingService";

const BookingTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getBooking();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await deleteBooking(id);
        setBookings(bookings.filter((b) => b._id !== id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/booking/edit/${id}`);
  };

  const handleAddBooking = () => {
    navigate("/admin/booking/add"); 
  };

  if (loading) {
    return <p className="text-white p-8">Loading bookings...</p>;
  }

  return (
    <div className="bg-stone-900 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-400">Booking Table</h2>
        <button
          onClick={handleAddBooking}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
        >
          <FaPlus /> Add Booking
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-stone-800 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-stone-700 text-stone-200">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Room</th>
              <th className="py-3 px-6 text-left">Check-in</th>
              <th className="py-3 px-6 text-left">Check-out</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-stone-400">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="py-3 px-6 text-stone-200">{booking._id}</td>
                  <td className="py-3 px-6 text-stone-200">{booking.customer || "N/A"}</td>
                  <td className="py-3 px-6 text-stone-200">
                    {booking.room ? `${booking.room.number} - ${booking.room.type}` : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-stone-200">
                    {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-stone-200">
                    {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : "N/A"}
                  </td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      booking.status === "Confirmed"
                        ? "text-green-400"
                        : booking.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {booking.status}
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(booking._id)}
                      className="text-yellow-400 hover:text-yellow-500 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;