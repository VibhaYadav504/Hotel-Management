import axios from "axios";

const API_URL = "http://localhost:5000/api/staff";

export const addStaff = async (payload) => {
  const formData = new FormData();
  for (const key in payload) {
    if (payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  }
  const response = await axios.post(`${API_URL}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get all staff
export const getStaff = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Get staff by ID
export const getStaffById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update staff
export const updateStaff = async (id, payload) => {
  const formData = new FormData();
  for (const key in payload) {
    if (payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  }

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete staff
export const deleteStaff = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
export const getWebStaff = async () => {
  const response = await axios.delete(`${API_URL}/`);
  return response.data;
};
