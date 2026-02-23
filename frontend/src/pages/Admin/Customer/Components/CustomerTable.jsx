import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { deleteCustomer, getCustomer } from "../../../../Service/Admin/CustomerService";
import { useNavigate,useParams } from "react-router-dom";

const CustomerTable = ({ onEdit }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomer();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      alert("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        setCustomers((prev) => prev.filter((customer) => customer._id !== id));
        alert("Customer deleted successfully!");
      } catch (err) {
        console.error("Error deleting customer:", err);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <div className="bg-stone-800 p-6 rounded-xl shadow-lg overflow-x-auto">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">
          Customer List
        </h2>

        <button
          onClick={() => navigate("/admin/customerform/add")}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <FaPlus />
          Add Customer
        </button>
      </div>

      {loading ? (
        <p className="text-center text-stone-300">Loading customers...</p>
      ) : (
        <table className="min-w-full bg-stone-900 rounded-xl">
          <thead>
            <tr className="bg-stone-700 text-stone-200">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer._id}
                className={`${
                  index % 2 === 0 ? "bg-stone-800" : "bg-stone-700"
                } text-stone-200`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{customer.firstName}</td>
                <td className="py-3 px-4">{customer.lastName}</td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">{customer.phone}</td>
                <td className="py-3 px-4">{customer.address}</td>
                <td className="py-3 px-4 flex gap-3">
                  
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/admin/customer/edit/${customer._id}`)}
                    className="bg-yellow-400 text-stone-900 px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    <FaEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>

                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-stone-300">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerTable;
