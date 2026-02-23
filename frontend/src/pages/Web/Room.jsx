import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Layout/Web/Header";
import Footer from "../../Layout/Web/Footer";
import staffBg from "../../assets/staffu.jpeg";
import { useEffect } from "react";
import { getWebRooms } from "../../Service/web/webRoomService";
import { useState } from "react";


const Room = () => {
  const [rooms,setRooms]=useState([]);
  const [loading,setLoading]=useState(true);
   useEffect(()=>{
    const fetchRooms=async()=>{
      try{
        const data=await getWebRooms();
        setRooms(data);
      }catch(error){
        console.error("Error fetching rooms:",error);
        }finally{
          setLoading(false);
        }
      };
      fetchRooms();
    
   },[]);
  return (
    <>
      <Header />

      <main className="bg-gray-100">

        {/* Hero Section */}
        <section
  className="relative text-white py-20 text-center bg-cover bg-center"
  style={{ backgroundImage: `url(${staffBg})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Our <span className="text-yellow-400">Luxury Rooms</span>
    </h1>
    <p className="max-w-2xl mx-auto text-gray-200 text-lg">
      Discover comfort and elegance in every stay at GrandStay Hotel.
    </p>
  </div>
</section>


        {/* Rooms Section */}
        <section className="container mx-auto py-20 px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                {/* Room Image */}
                <div className="overflow-hidden">
                  <img
                    src={room.photo}
                    alt={room.name}
                    className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-stone-900">
                    {room.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {room.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-bold text-lg">
                      {room.price}
                    </span>

                    <Link
                      to="/booking"
                      className="bg-yellow-500 text-stone-900 px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Section */}
      <section className="bg-gray-900 py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-white">
      Room <span className="text-yellow-500">Amenities</span>
    </h2>

    <div className="grid md:grid-cols-4 gap-8">
      {/* Amenity Card */}
      <div className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 p-8 rounded-xl shadow-xl cursor-pointer">
        <h4 className="font-bold text-xl mb-3">Free WiFi</h4>
        <p className="text-gray-300 hover:text-gray-900 text-sm">
          High-speed internet access in all rooms.
        </p>
      </div>

      <div className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 p-8 rounded-xl shadow-xl cursor-pointer">
        <h4 className="font-bold text-xl mb-3">Air Conditioning</h4>
        <p className="text-gray-300 hover:text-gray-900 text-sm">
          Comfortable temperature control.
        </p>
      </div>

      <div className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 p-8 rounded-xl shadow-xl cursor-pointer">
        <h4 className="font-bold text-xl mb-3">Room Service</h4>
        <p className="text-gray-300 hover:text-gray-900 text-sm">
          24/7 premium room service available.
        </p>
      </div>

      <div className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 p-8 rounded-xl shadow-xl cursor-pointer">
        <h4 className="font-bold text-xl mb-3">Smart TV</h4>
        <p className="text-gray-300 hover:text-gray-900 text-sm">
          Enjoy Netflix & premium channels.
        </p>
      </div>
    </div>
  </div>
</section>


      </main>

      <Footer />
    </>
  );
};

export default Room;
