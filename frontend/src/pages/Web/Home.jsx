import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Layout/Web/Header";
import Footer from "../../Layout/Web/Footer";

import person1 from "../../assets/p1.webp";
import person2 from "../../assets/p2.webp";
import person3 from "../../assets/p3.webp";

import hotel1 from "../../assets/hotel7.jpg";
import hotel2 from "../../assets/hotel2.avif";
import hotel3 from "../../assets/hotel1.avif";
import hotel4 from "../../assets/hotel4.jpg";
import hotel5 from "../../assets/hotel5.jpg";
import hotel6 from "../../assets/hotel8.jpg";
import hotel7 from "../../assets/hotel6.jpg";
const images = [hotel1, hotel2, hotel3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <main className="bg-gray-100">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[85vh] overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hotel"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              } brightness-75`}
            />
          ))}

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to GrandStay Hotel
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              Luxury, Comfort & Unforgettable Experiences
            </p>
            <Link
              to="/booking"
              className="bg-yellow-400 text-stone-900 font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition"
            >
              Book Now
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-stone-100">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={hotel4}
                alt="About Hotel"
                className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6 text-stone-900">
                Experience Luxury at <span className="text-yellow-500">GrandStay</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At GrandStay Hotel, we redefine hospitality with elegance and comfort. 
                Our beautifully designed rooms, fine dining experience, and exceptional 
                customer service ensure every guest enjoys a memorable stay.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're traveling for business or leisure, we provide the perfect 
                blend of luxury and convenience in the heart of the city.
              </p>
              <button className="bg-yellow-500 text-stone-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Featured Rooms */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Featured Rooms</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[hotel5, hotel7, hotel6].map((room, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={room} alt="Room" className="h-56 w-full object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Deluxe Room</h3>
                  <p className="text-gray-600 mb-4">Comfortable stay with modern amenities.</p>
                  <Link
                    to="/room"
                    className="bg-yellow-500 px-4 py-2 rounded text-stone-900 font-semibold hover:bg-yellow-400"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-stone-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[person1, person2, person3].map((person, i) => {
                const names = ["Rahul Sharma", "Jons", "Jenifer"];
                const roles = ["Business Traveler", "Family Vacation", "Tourist"];
                const texts = [
                  "Amazing experience! The rooms were clean and staff was very friendly.",
                  "Luxury at its best. The food and service were outstanding!",
                  "Perfect location and top-class amenities. Highly recommended!"
                ];
                return (
                  <div key={i} className="bg-yellow-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                    <div className="flex justify-center mb-4 text-yellow-400">⭐⭐⭐⭐⭐</div>
                    <p className="text-white italic mb-6">{texts[i]}</p>
                    <div className="flex flex-col items-center">
                      <img
                        src={person}
                        alt={names[i]}
                        className="w-14 h-14 rounded-full mb-3 object-cover"
                      />
                      <h4 className="font-semibold text-white">{names[i]}</h4>
                      <span className="text-sm text-gray-300">[{roles[i]}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
