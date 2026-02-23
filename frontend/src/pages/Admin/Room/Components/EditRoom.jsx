import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../../../../Service/Admin/RoomService";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    name: "",
    type: "",
    price: "",
    status: "Available",
    photo: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch Room By ID (Same like EditStaff)
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const data = await getRoomById(id);

        setRoom({
          name: data.name || "",
          type: data.type || "",
          price: data.price || "",
          status: data.status || "Available",
          photo: data.photo || null,
        });
      } catch (err) {
        console.error("Error fetching room:", err);
        alert("Failed to load room data");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setRoom({ ...room, photo: files[0] });
    } else {
      setRoom({ ...room, [name]: value });
    }
  };

  // Handle Submit (Same Flow as Staff)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", room.name);
      formData.append("type", room.type);
      formData.append("price", room.price);
      formData.append("status", room.status);

      if (room.photo && typeof room.photo === "object") {
        formData.append("photo", room.photo);
      }

      await updateRoom(id, formData);

      alert("Room updated successfully!");
      navigate("/admin/room"); 
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room");
    }
  };

  if (loading)
    return <p className="text-stone-300 p-8">Loading room data...</p>;

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Edit Room
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
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={room.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              Upload New Photo
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
                className="w-24 h-24 rounded-lg mx-auto border-2 border-yellow-400 object-cover"
              />
            </div>
          )}

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-stone-900 font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;