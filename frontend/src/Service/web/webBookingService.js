import axios from "axios";

const API_URL = "http://localhost:5000/api/booking";

export const getWebBookings = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const addBooking = async (formData) => {
  const payload = {
    ...formData,
    checkIn: new Date(formData.checkIn),
    checkOut: new Date(formData.checkOut)
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};