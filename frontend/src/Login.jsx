import React, { useState } from "react";
import hotel from "./assets/hotelicon.png";
import { login as loginService } from "./Service/Admin/authService.js";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginService(formData.username, formData.password);
      console.log("Logged in user:", data.user); // User info from backend
      alert("Login successful!");

      // Pass the logged-in user back to parent component if needed
      if (onLogin) onLogin(data.user);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-8 pb-4 bg-[#171717] rounded-3xl transition duration-500 hover:scale-105 hover:border hover:border-black shadow-2xl w-90"
      >
        <div className="flex justify-center mt-6">
          <img src={hotel} alt="Hotel Icon" className="w-16 h-16 object-contain" />
        </div>

        <p className="text-center text-white text-xl font-semibold">Login</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex items-center gap-2 rounded-2xl p-3 bg-[#171717] shadow-inner shadow-black">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-transparent outline-none border-none w-full text-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 rounded-2xl p-3 bg-[#171717] shadow-inner shadow-black">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-transparent outline-none border-none w-full text-gray-300"
          />
        </div>

        <div className="flex justify-center mt-8 gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-[#252525] text-white transition duration-300 hover:bg-black disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          
        </div>

       
      </form>
    </div>
  );
};

export default Login;