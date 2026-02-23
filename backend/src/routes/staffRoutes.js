import express from "express";
import multer from "multer";
import {addStaff,getStaffs,getStaffById,updateStaff,deleteStaff} from "../Controller/staffController.js"
const router=express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/", upload.single("photo"), addStaff);
router.get("/",getStaffs);
router.get("/:id",getStaffById);
router.put("/:id", upload.single("photo"), updateStaff);
router.delete("/:id",deleteStaff);
export default router;