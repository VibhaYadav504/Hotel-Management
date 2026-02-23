import Room from "../models/room.js";


export const getWebRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.error("Error fetching web rooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};