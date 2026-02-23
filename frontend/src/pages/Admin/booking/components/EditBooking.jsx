import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingBYId, updateBooking } from "../../../../Service/Admin/BookingService";


const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [booking,setBooking]=useState({
  customer:"",
  room:"",
  checkIn:"",
  checkOut:"",
  status:"Pending",
});
const [loading,setLoading]=useState(true);
useEffect(()=>{
  const fetchBooking=async()=>{
    try{
      const data=await getBookingBYId(id);
      setBooking(data);
    }catch(error){
      console.error("Error fetching booking:",error);
    } finally{
      setLoading(false);
    }
  };
  fetchBooking();
},[id]);

const handleChange=(e)=>{
  const {name,value}=e.target;
  setBooking({...booking,[name]:value});
};
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    await updateBooking (id,booking);
    alert("Booking updated successfully!");
    navigate("/admin/bookingtable");
  }catch(error){
    console.error("Error updating booking:",error);
    alert("Something went wrong!");
  }
};
if(loading){

}

 

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Edit Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Customer Name
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Room
            </label>
            <input
              type="text"
              name="room"
              value={booking.room}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Check-in Date
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Check-out Date
            </label>
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
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooking;
