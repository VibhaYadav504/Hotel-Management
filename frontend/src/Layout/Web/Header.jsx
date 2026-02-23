import React, { useState } from "react";
import { Link } from "react-router-dom";
import hotel from "../../assets/hotelicon.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-stone-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={hotel} alt="Hotel Logo" className="h-10 w-10 object-contain"/>
          <span className="text-2xl font-bold">GrandStay Hotel</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/room" className="hover:text-yellow-400 transition">Room</Link>
          <Link to="/staff" className="hover:text-yellow-400 transition">Staff</Link>
          <Link to="/booking" className="hover:text-yellow-400 transition">Booking</Link>
        </nav>

        {/* Desktop Login Button */}
        <Link
          to="/login"
          className="hidden md:block bg-yellow-500 text-stone-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-800 px-6 py-4 space-y-4">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          <Link to="/about" className="block hover:text-yellow-400">About</Link>
          <Link to="/room" className="block hover:text-yellow-400">Room</Link>
          <Link to="/staff" className="block hover:text-yellow-400">Staff</Link>
          <Link to="/booking" className="block hover:text-yellow-400">Booking</Link>
          <Link
            to="/login"
            className="block bg-yellow-500 text-stone-900 text-center py-2 rounded font-semibold"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
