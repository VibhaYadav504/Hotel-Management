import React, { useState,useEffect } from "react";
import { addRoom } from "../../../../Service/Admin/RoomService";
import { useNavigate } from "react-router-dom";
const RoomForm = () => {
  const [room, setRoom] = useState({
    name: "",
    type: "",
    price: "",
    status: "Available",
    photo: null,
  });
const [loading,setLoading]=useState(false);
  const navigate = useNavigate(); 

const handleChange=(e)=>{
  const {name,value,files}=e.target;
   if(name ==="photo"){
    setRoom({...room,photo:files[0]});

   }else{
    setRoom({...room,[name]:value});
   }
};
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    setLoading(true);
    const formData=new FormData();
    formData.append("name",room.name);
    formData.append("type",room.type);
    formData.append("price",room.price);
    formData.append("status",room.status);

    if(room.photo){
      formData.append("photo",room.photo);
    }
    await addRoom(formData);
    alert("Room Added Sucessfully!");
    setRoom({
      name:"",
      type:"",
      price:"",
      status:"Available",
      photo:null,
    });
          navigate("/admin/room");
  } catch (error){
    console.error(error);
    alert("Error adding room");
  } finally{
    setLoading(false);
  }
};
 

  return (
       <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Add New Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              value={room.name}
              onChange={handleChange}
              placeholder="Enter room name"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Room Type
            </label>
            <input
              type="text"
              name="type"
              value={room.type}
              onChange={handleChange}
              placeholder="e.g., Deluxe, Suite"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Price per Night
            </label>
            <input
              type="number"
              name="price"
              value={room.price}
              onChange={handleChange}
              placeholder="Enter price in USD"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Status
            </label>
            <select
              name="status"
              value={room.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-stone-200"
            />
          </div>

          {/* Photo Preview */}
          {room.photo && (
            <div className="mt-4 text-center">
              <p className="text-stone-300 mb-2">Photo Preview:</p>
              <img
                src={
                  typeof room.photo === "object"
                    ? URL.createObjectURL(room.photo)
                    : room.photo
                }
                alt="Room Preview"
                className="w-24 h-24 rounded-lg mx-auto object-cover border-2 border-yellow-400"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-stone-900 font-bold rounded-lg hover:bg-yellow-500 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
