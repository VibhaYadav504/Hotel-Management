import express from "express";
import { getWebRooms } from "../Controller/webRoomController.js";

const router = express.Router();


router.get("/", getWebRooms);

export default router;