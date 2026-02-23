import React, { useState,useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteRoom, getRoom } from "../../../../Service/Admin/RoomService";
const RoomTable = () => {

  const [rooms, setRooms] = useState([]);
   const[loading,setLoading]=useState(false);
    const navigate = useNavigate(); 

    const fetchRooms=async()=>{
      try{
        setLoading(true);
        const data=await getRoom();
        setRooms(data);

      }catch(error){
        console.error("Error fetching rooms:",error);
        alert("Failed to fetch rooms");
      } finally{
        setLoading(false);
      }
    } ;
    useEffect(()=>{
      fetchRooms();
    },[]);

    const handleDelete=async(id)=>{
      if(window.confirm("delete this room?")){
        try{
          await deleteRoom(id);
          fetchRooms();
        }catch(error){
          console.error("Error fetching room:",error);
          alert("Failed to delete room");
        }
      }
    };
    const handleEdit=(room)=>{
      navigate(`/admin/room/edit/${room._id}`);

    };

  

  return (
     <div className="bg-stone-800 p-6 rounded-xl shadow-lg overflow-x-auto">

      {/*  Add Room Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">Room List</h2>

        <button
          onClick={() => navigate("/admin/room/add")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Room
        </button>
      </div>

      {loading ? (
        <p className="text-stone-300">Loading...</p>
      ) : (
        <table className="min-w-full bg-stone-900 rounded-xl">
          <thead>
            <tr className="bg-stone-700 text-stone-200">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price ($)</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr
                  key={room._id}
                  className={`${
                    index % 2 === 0 ? "bg-stone-800" : "bg-stone-700"
                  } text-stone-200`}
                >
                  <td className="py-3 px-4">{room._id}</td>
                  <td className="py-3 px-4">{room.name}</td>
                  <td className="py-3 px-4">{room.type}</td>
                  <td className="py-3 px-4">{room.price}</td>
                  <td className="py-3 px-4">{room.status}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(room)}
                      className="bg-yellow-400 text-stone-900 px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-stone-300">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomTable;
