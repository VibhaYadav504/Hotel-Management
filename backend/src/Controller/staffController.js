import Staff from "../models/staff.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const addStaff = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    let photo = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "staff_photos",
      });
      photo = result.secure_url;
    }

    const staff = await Staff.create({
      name,
      email,
      role,
      status,
      photo,
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.role = role || staff.role;
    staff.status = status || staff.status;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "staff_photos",
      });
      staff.photo = result.secure_url;
    }

    const updatedStaff = await staff.save();
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    await staff.deleteOne();
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};