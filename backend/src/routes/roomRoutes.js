import express from "express";


import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../Controller/roomController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("photo"), addRoom);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.put("/:id", upload.single("photo"), updateRoom);
router.delete("/:id", deleteRoom);

export default router;