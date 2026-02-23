import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { deleteStaff, getStaff } from "../../../../Service/Admin/StaffService";

const StaffTable = () => {
  const [staffData,setStaffData] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await getStaff();
      setStaffData(data);
    } catch (err) {
      console.error("Error fetching staff",err);
      alert("Failed to load staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Delete this Staff?")){
      try{
        await deleteStaff(id);
        setStaffData((prev)=>prev.filter((staff)=>staff._id !== id));
        alert("Staff deleted successfully!");
      }catch(err){
        console.error("Error deleting staff:",err);
        alert("Failed to delete staff");
      }
    }
  };

  return (
    <div className="bg-stone-900 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-400">Staff Management</h2>
        {/* Add Staff Button */}
dashboardControlle        <button
          onClick={() => navigate("/admin/staff/add")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Staff
        </button>
      </div>

      {loading ? (
        <p className="text-stone-300">Loading staff...</p>
      ) : (
        <div className="overflow-x-auto bg-stone-800 rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left text-stone-300">
            <thead className="bg-stone-700 text-yellow-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Staff</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staffData.map((staff) => (
                <tr
                  key={staff._id}
                  className="border-b border-stone-700 hover:bg-stone-700 transition duration-300"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={staff.photo || "https://i.pravatar.cc/40"}
                      alt={staff.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <span className="font-medium text-stone-200">{staff.name}</span>
                  </td>
                  <td className="px-6 py-4">{staff.role}</td>
                  <td className="px-6 py-4">{staff.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        staff.status === "Active"
                          ? "bg-yellow-400 text-stone-900"
                          : "bg-stone-600 text-stone-200"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/staff/edit/${staff._id}`)}
                      className="px-4 py-1 bg-yellow-400 text-stone-900 rounded-md text-xs font-semibold hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="px-4 py-1 bg-stone-600 text-white rounded-md text-xs font-semibold hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {staffData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-stone-300">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffTable;