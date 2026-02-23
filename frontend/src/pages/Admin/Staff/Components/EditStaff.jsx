import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { getStaffById, updateStaff } from "../../../../Service/Admin/StaffService";

const EditStaff = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
    photo: null,
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const data = await getStaffById(id);
        setStaff({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          status: data.status || "Active",
          photo: data.photo || null,
        });
      } catch (err) {
        console.error("Error fetching staff:", err);
        alert("Failed to load staff data");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setStaff({ ...staff, photo: files[0] });
    } else {
      setStaff({ ...staff, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStaff(id, staff);
      alert("Staff updated successfully!");
      navigate("/admin/staff"); 
    } catch (err) {
      console.error("Error updating staff:", err);
      alert("Failed to update staff");
    }
  };

  if (loading) return <p className="text-stone-300 p-8">Loading staff data...</p>;

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Edit Staff
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={staff.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={staff.role}
              onChange={handleChange}
              placeholder="Enter role"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Status</label>
            <select
              name="status"
              value={staff.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-stone-300 font-semibold mb-2">Upload New Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-stone-200"
            />
          </div>

          {/* Photo Preview */}
          {staff.photo && (
            <div className="mt-4 text-center">
              <p className="text-stone-300 mb-2">Photo Preview:</p>
              <img
                src={typeof staff.photo === "object" ? URL.createObjectURL(staff.photo) : staff.photo}
                alt="Staff Preview"
                className="w-24 h-24 rounded-full mx-auto border-2 border-yellow-400 object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-stone-900 font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              Update Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
