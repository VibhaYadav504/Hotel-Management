import React, { useState, useEffect } from "react";
import { getWebBookings, addBooking } from "../../Service/web/webBookingService";
import { getWebRooms } from "../../Service/Admin/RoomService";

import Header from "../../Layout/Web/Header";
import Footer from "../../Layout/Web/Footer";
import bookingImage from "../../assets/book.webp";

const Booking = () => {
  const TAX_RATE = 0.1;
  const SERVICE_FEE = 20;

  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    payment: "Cash",
    requests: "",
  });

  // Fetch rooms from API on page load
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getWebRooms(); // call your API
        const roomData = response?.data || [];
        setRooms(roomData);

        if (roomData.length > 0) {
          setFormData(prev => ({ ...prev, roomType: roomData[0].name }));
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Fetch existing bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getWebBookings();
        setBookings(response?.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Calculate nights
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const diffTime = new Date(formData.checkOut) - new Date(formData.checkIn);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      setNights(diffDays > 0 ? diffDays : 0);
    }
  }, [formData.checkIn, formData.checkOut]);

  // Calculate total
  useEffect(() => {
    const selectedRoom = rooms.find(r => r.name === formData.roomType);
    const pricePerNight = selectedRoom?.price || 0;
    const subtotal = pricePerNight * nights;
    const tax = subtotal * TAX_RATE;
    const grandTotal = subtotal + tax + SERVICE_FEE;
    setTotal(grandTotal);
  }, [formData.roomType, nights, rooms]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.checkIn || !formData.checkOut) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const selectedRoom = rooms.find(r => r.name === formData.roomType);

      const payload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        room: {
          roomId: selectedRoom?._id,
          name: selectedRoom?.name,
          price: selectedRoom?.price,
        },
        checkIn: new Date(formData.checkIn),
        checkOut: new Date(formData.checkOut),
        guests: formData.guests,
        payment: formData.payment,
        requests: formData.requests,
        nights: nights,
        totalAmount: total,
        status: "Pending", // optional, for backend
      };

      const response = await addBooking(payload);

      setBookings([...bookings, response]);
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        roomType: rooms[0]?.name || "",
        payment: "Cash",
        requests: "",
      });
      setNights(0);
      setTotal(0);

    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Booking failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const selectedRoom = rooms.find(r => r.name === formData.roomType);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        <img src={bookingImage} alt="Luxury Stay" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            Experience Comfort & Luxury
          </h1>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Book Your Stay</h2>

          {success && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center">
              Booking Confirmed Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className="border p-3 w-full rounded" />
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="border p-3 w-full rounded" />
            <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} className="border p-3 w-full rounded" />

            <div className="grid md:grid-cols-2 gap-3">
              <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="border p-3 rounded" />
              <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="border p-3 rounded" />
            </div>

            <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className="border p-3 w-full rounded" />

            {/* Rooms Dropdown */}
            <select name="roomType" value={formData.roomType} onChange={handleChange} className="border p-3 w-full rounded">
              {rooms.map(r => (
                <option key={r._id} value={r.name}>{r.name}</option>
              ))}
            </select>

            <textarea name="requests" rows="3" placeholder="Special Requests..." value={formData.requests} onChange={handleChange} className="border p-3 w-full rounded" />

            {/* Summary */}
            <div className="bg-gray-100 p-4 rounded">
              <p>Nights: {nights}</p>
              <p>Room Price: ${selectedRoom?.price || 0} / night</p>
              <p>Subtotal: ${(selectedRoom?.price || 0) * nights}</p>
              <p>Tax (10%): ${((selectedRoom?.price || 0) * nights * TAX_RATE).toFixed(2)}</p>
              <p>Service Fee: ${SERVICE_FEE}</p>
              <p className="font-bold text-yellow-600">Total: ${total.toFixed(2)}</p>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-yellow-500 py-3 rounded font-bold">
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Booking;