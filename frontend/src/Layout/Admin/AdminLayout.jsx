import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-stone-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-stone-950">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

    </div>
  );
};

export default AdminLayout;
