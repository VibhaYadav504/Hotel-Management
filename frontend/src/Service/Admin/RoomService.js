
import axios from "axios";

const API_URL = "http://localhost:5000/api/room"; 

// Add a new room
export const addRoom = async (payload) => {
  const response = await axios.post(`${API_URL}/`, payload);
  return response.data;
};

// Get all rooms
export const getRoom = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Get a room by ID
export const getRoomById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a room
export const updateRoom = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

// Delete a room
export const deleteRoom = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getWebRooms = async () => {
  const response = await axios.delete(`${API_URL}/`);
  return response.data;
};