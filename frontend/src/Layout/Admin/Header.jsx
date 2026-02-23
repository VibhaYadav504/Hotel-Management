import React, { useState } from "react";
import { FaBars, FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-stone-900 shadow-2xl px-8 py-6 flex items-center justify-between sticky top-0 z-50 border-b border-stone-700">
      
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="text-stone-300 text-2xl md:hidden hover:text-yellow-400 transition duration-300"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-700 via-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-wide select-none">
          🏨 Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-stone-800 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
          <FaSearch className="text-stone-400 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none text-sm w-48 lg:w-72 text-stone-200 placeholder-stone-500"
            aria-label="Search"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer group">
          <FaBell className="text-2xl text-stone-300 group-hover:text-yellow-400 transition duration-300" />
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-stone-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer group select-none"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <FaUserCircle className="text-4xl text-stone-300 group-hover:text-yellow-400 transition duration-300" />
            <span className="hidden md:block font-semibold text-stone-200 group-hover:text-yellow-400 transition">
              Admin
            </span>
          </div>

          {open && (
            <div className="absolute right-0 mt-4 w-52 bg-stone-800 shadow-2xl rounded-xl overflow-hidden border border-stone-700 transition-all duration-300 z-50">
              <button className="block w-full text-left px-5 py-3 text-stone-200 hover:bg-stone-700 transition duration-200">
                👤 Profile
              </button>
              <button className="block w-full text-left px-5 py-3 text-stone-200 hover:bg-stone-700 transition duration-200">
                ⚙ Settings
              </button>
              <button className="block w-full text-left px-5 py-3 text-yellow-400 hover:bg-stone-700 transition duration-200">
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
