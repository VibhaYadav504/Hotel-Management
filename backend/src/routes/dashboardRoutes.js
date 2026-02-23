import express from "express";
import { getStats } from "../Controller/dashboardController.js";  

const router = express.Router();
router.get("/stats", getStats);

export default router;