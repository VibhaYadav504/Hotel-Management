import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCustomer, getCustomerById, updateCustomer } from "../../../../Service/Admin/CustomerService";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (id) {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer((prev) => ({
          firstName: prev.firstName || data.firstName || "",
          lastName: prev.lastName || data.lastName || "",
          email: prev.email || data.email || "",
          phone: prev.phone || data.phone || "",
          address: prev.address || data.address || "",
        }));
      } catch (err) {
        console.error("Error fetching customer:", err);
        alert("Failed to fetch customer data.");
      }
    };
    fetchCustomer();
  }
}, [id]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateCustomer(id, customer);
        alert(`Customer "${customer.firstName} ${customer.lastName}" updated successfully!`);
      } else {
        await addCustomer(customer);
        alert(`Customer "${customer.firstName} ${customer.lastName}" added successfully!`);
      }
      navigate("/admin/customer");
    } catch (err) {
      console.error("Error saving customer:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          {id ? "Update Customer" : "Add New Customer"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-stone-300 font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-200 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-yellow-400 text-stone-900 font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : id ? "Update Customer" : "Add Customer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
