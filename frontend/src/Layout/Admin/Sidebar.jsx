import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBed,
  FaUsers,
  FaUserTie,
  FaCalendarCheck,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-72 min-h-screen bg-stone-900 shadow-2xl border-r border-stone-700 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-stone-700 flex items-center gap-3">
        <div className="text-4xl">🏨</div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-wide">
          GrandStay
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        <SidebarItem label="Dashboard" icon={<FaTachometerAlt />} to="/admin/dashboard" />
        <SidebarItem label="Rooms" icon={<FaBed />} to="/admin/room" />
        <SidebarItem label="Staff" icon={<FaUserTie />} to="/admin/staff" />
        <SidebarItem label="Customers" icon={<FaUsers />} to="/admin/customer" />
        <SidebarItem label="Bookings" icon={<FaCalendarCheck />} to="/admin/booking" />
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-stone-700 text-center text-sm text-stone-400 select-none">
        © 2026 <span className="text-yellow-400 font-semibold">GrandStay Hotel</span>
      </div>
    </aside>
  );
};

const SidebarItem = ({ label, icon, to }) => {
  return (
    <Link to={to}>
      <div className="flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
                      text-stone-300 hover:bg-stone-800 hover:text-yellow-400
                      transition duration-300">
        <span className="text-xl">{icon}</span>
        <span className="font-medium tracking-wide">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
