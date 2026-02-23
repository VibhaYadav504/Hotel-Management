import express from "express";
import { addWebBooking, getWebBookings } from "../Controller/webBookingController.js";


const router = express.Router();

router.post("/",addWebBooking)
router.get("/", getWebBookings);


export default router;