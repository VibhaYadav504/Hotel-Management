import axios from "axios";
const API_URL = "http://localhost:5000/api/booking";


export const addBooking = async (payload) => {
  const response = await axios.post(`${API_URL}/`, payload);
  return response.data;
};

export const getBooking = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

export const getBookingBYId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateBooking = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
export const getWebBookings = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};
