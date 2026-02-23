import React from "react";
import Header from "../../Layout/Web/Header";
import Footer from "../../Layout/Web/Footer";

// import staff1 from "../../assets/p1.webp";
// import staff2 from "../../assets/p2.webp";
// import staff3 from "../../assets/p3.webp";
// import staff4 from "../../assets/p1.webp";
// import staff5 from "../../assets/p2.webp";
// import staff6 from "../../assets/p3.webp";
import heroBg from "../../assets/staff.jpg";
import { useState } from "react";
import { getWebStaff } from "../../Service/web/webStaffService";
import { useEffect } from "react";

const Staff = () => {
  const [staffMembers,setStaffMembers]=useState([]);
  const [loading,setLoading]=useState(true);
   useEffect(()=>{
    const fetchStaff=async()=>{
      try{
        const data=await getWebStaff();
        setStaffMembers(data);
      }catch(error){
        console.error("Error fetching staff:",error);
      }finally{
        setLoading(false);
      }
    };
    fetchStaff();
   },[]);

  return (
   <>
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Meet Our <span className="text-yellow-500">Professional Staff</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-200">
            Our dedicated team ensures your stay is comfortable and unforgettable.
          </p>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {loading ? (
            <p className="text-center text-gray-500">Loading staff...</p>
          ) : (
            staffMembers.map((staff, index) => (
              <div
                key={staff._id}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src={staff.photo}
                    alt={staff.name}
                    className="w-72 h-72 object-cover rounded-2xl shadow-xl border-4 border-yellow-500 hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-2">{staff.name}</h3>

                  <p className="text-yellow-500 font-semibold mb-3">
                    {staff.role}
                  </p>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {Array.from({ length: staff.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {staff.description}
                  </p>

                  <blockquote className="italic text-gray-500 border-l-4 border-yellow-500 pl-4">
                    "{staff.feedback}"
                  </blockquote>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Staff;
