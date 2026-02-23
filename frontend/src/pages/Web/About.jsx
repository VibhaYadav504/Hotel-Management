import React, { useState, useEffect } from "react";
import Header from "../../Layout/Web/Header";
import Footer from "../../Layout/Web/Footer";

// Images
import hotel1 from "../../assets/hotel1.avif";
import hotel2 from "../../assets/hotel2.avif";
import aboutb from "../../assets/aboutb.jpg";
import localImg1 from "../../assets/local.jpg";
import localImg2 from "../../assets/local2.jpg";
import missionImg from "../../assets/mission.jpg";
import visionImg from "../../assets/hotelvission.png";
import slide1 from "../../assets/luxury.jpg";
import slide2 from "../../assets/l2.jpg";
import slide3 from "../../assets/l3.jpg";
import slide4 from "../../assets/l4.jpg";

const About = () => {
  // Slider state
  const slides = [slide1, slide2, slide3, slide4];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Header />

      <main className="bg-gray-100">

        {/* Hero Section */}
        <section
          className="relative text-white py-28 text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutb})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-yellow-400">GrandStay Hotel</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-200 text-lg">
              Where luxury meets comfort. We provide unforgettable stays with world-class hospitality and premium services.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-[#f4f1ec]">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center">
              <img
                src={hotel1}
                alt="Hotel Interior"
                className="w-[85%] h-[500px] object-cover rounded-xl shadow-2xl"
              />
              <img
                src={hotel2}
                alt="Luxury Room"
                className="absolute bottom-[-40px] right-10 w-[55%] h-[380px] object-cover rounded-xl border-4 border-white shadow-xl"
              />
            </div>
            <div>
              <p className="uppercase tracking-widest text-sm text-yellow-600 mb-3">
                Paradise Hotel
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Our History
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                GrandStay Hotel was founded with a passion for excellence in hospitality. We aim to create a welcoming environment where guests feel valued, comfortable, and relaxed.
              </p>
              <p className="italic text-lg text-stone-800 font-semibold mt-8">
                Maria... the Owner
              </p>
            </div>
          </div>
        </section>

        {/* Local Amenities */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="uppercase tracking-widest text-sm text-yellow-600 mb-3">
                Paradise Hotel
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Local Amenities
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Discover the best experiences around GrandStay Hotel.
              </p>
              <div className="flex items-start gap-4 mb-8">
                <div className="text-yellow-600 text-2xl">★</div>
                <div>
                  <h4 className="text-xl font-semibold">Local Restaurants</h4>
                  <p className="text-gray-600">World-class dining nearby.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-8">
                <div className="text-yellow-600 text-2xl">★</div>
                <div>
                  <h4 className="text-xl font-semibold">Nature</h4>
                  <p className="text-gray-600">Beautiful parks & waterfalls.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-yellow-600 text-2xl">★</div>
                <div>
                  <h4 className="text-xl font-semibold">Art & Culture</h4>
                  <p className="text-gray-600">Museums & cultural landmarks.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <img
                src={localImg1}
                alt="Local Restaurant"
                className="w-full h-[280px] object-cover rounded-xl shadow-xl"
              />
              <img
                src={localImg2}
                alt="Nature"
                className="w-full h-[280px] object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="bg-[#f4f1ec] py-24">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-stone-900 text-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition duration-500 border-t-4 border-yellow-500">
              <img src={missionImg} alt="Our Mission" className="w-full h-96 object-cover" />
              <div className="p-8 h-64 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-yellow-400">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To deliver exceptional hospitality services that exceed guest expectations through luxury, comfort, and personalized care.
                </p>
              </div>
            </div>
            {/* Vision */}
            <div className="bg-stone-900 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition duration-500 border-t-4 border-yellow-500">
              <img src={visionImg} alt="Our Vision" className="w-full h-96 object-cover" />
              <div className="p-8 h-64 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-yellow-600">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become a leading luxury hotel brand recognized globally for excellence, elegance, and world-class service that creates unforgettable guest experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us with Slider */}
        <section className="py-24 bg-[#f4f1ec]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-16">
              Why Choose <span className="text-yellow-600">GrandStay?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                  <h4 className="text-xl font-semibold mb-2 text-stone-900">Luxury Rooms</h4>
                  <p className="text-gray-600">Spacious and beautifully designed rooms with modern amenities.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                  <h4 className="text-xl font-semibold mb-2 text-stone-900">Fine Dining</h4>
                  <p className="text-gray-600">Enjoy world-class cuisine prepared by expert chefs.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                  <h4 className="text-xl font-semibold mb-2 text-stone-900">24/7 Support</h4>
                  <p className="text-gray-600">Dedicated service to ensure comfort anytime.</p>
                </div>
              </div>
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                {slides.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Hotel"
                    className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;
