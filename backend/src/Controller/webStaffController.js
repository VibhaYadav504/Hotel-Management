import Staff from "../models/staff.js";


export const getWebStaff = async (req, res) => {
  try {
    const staff = await Staff.find();

    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching web staff:", error);
    res.status(500).json({ message: "Server error" });
  }
};