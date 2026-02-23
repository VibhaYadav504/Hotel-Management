
import React, { useEffect, useState } from "react";

import { FaUserTie, FaBed, FaUsers, FaCalendarCheck } from "react-icons/fa";
import { getDashboardStats } from "../../../Service/Admin/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-white p-8">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-8">{error}</p>;

  const cards = [
    { name: "Staff", count: stats.staff, icon: <FaUserTie className="text-white text-3xl" />, bg: "bg-blue-500" },
    { name: "Rooms", count: stats.rooms, icon: <FaBed className="text-white text-3xl" />, bg: "bg-green-500" },
    { name: "Customers", count: stats.customers, icon: <FaUsers className="text-white text-3xl" />, bg: "bg-purple-500" },
    { name: "Bookings", count: stats.bookings, icon: <FaCalendarCheck className="text-white text-3xl" />, bg: "bg-yellow-500" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-stone-200 mb-8">📊 Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ name, count, icon, bg }) => (
          <div key={name} className="bg-stone-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg mb-4 ${bg}`}>{icon}</div>
            <h2 className="text-2xl font-bold text-white">{count}</h2>
            <p className="text-stone-400 uppercase text-sm tracking-wide">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;