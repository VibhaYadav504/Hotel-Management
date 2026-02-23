import express from "express";
import { getWebStaff } from "../Controller/webStaffController.js";


const router = express.Router();


router.get("/", getWebStaff);

export default router;