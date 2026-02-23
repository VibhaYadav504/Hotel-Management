import express from "express";
import { addBooking, deleteBooking, getBookingById, getBookings, updateBooking } from "../Controller/bookingController.js";
const router=express.Router();
router.post("/",addBooking);
router.get("/",getBookings);
router.get("/:id",getBookingById);
router.put("/:id",updateBooking);
router.delete("/:id",deleteBooking);
export default router;