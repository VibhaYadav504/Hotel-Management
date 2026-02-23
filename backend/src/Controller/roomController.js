import Room from "../models/room.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// Add new room
export const addRoom = async (req, res) => {
  try {
    const { name, type, price, status } = req.body;
    let photoUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, { folder: "rooms" });
      photoUrl = result.secure_url;
    }

    const room = await Room.create({
      name,
      type,
      price,
      status,
      photo: photoUrl,
    });

    res.status(201).json(room);
  } catch (error) {
    console.error("Room Add Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single room
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const { name, type, price, status } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, { folder: "rooms" });
      room.photo = result.secure_url;
    }

    room.name = name || room.name;
    room.type = type || room.type;
    room.price = price || room.price;
    room.status = status || room.status;

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    console.error("Room Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};