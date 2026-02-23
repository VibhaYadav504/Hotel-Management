import React, { useState, useEffect } from "react";
import { updateCustomer } from "../../../../Service/Admin/CustomerService";


const EditCustomer = ({ customerData, onSubmit }) => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

   useEffect(() => {
  if (customerData) {
     setCustomer({
      firstName: customerData.firstName || "",
      lastName: customerData.lastName || "",
      email: customerData.email || "",
      phone: customerData.phone || "",
      address: customerData.address || "",
    });
  }
}, [customerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerData?._id) {
      alert("Customer ID missing!");
      return;
    }

    try {
      setLoading(true);

      await updateCustomer(customerData._id, customer);

      alert(
        `Customer "${customer.firstName} ${customer.lastName}" updated successfully!`
      );

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-stone-800 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Edit Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-stone-300 font-semibold mb-2">
              First Name
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Last Name
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Email
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Phone
            </label>
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
            <label className="block text-stone-300 font-semibold mb-2">
              Address
            </label>
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
              {loading ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
