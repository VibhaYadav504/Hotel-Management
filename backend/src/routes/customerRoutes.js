import express from "express";
import { addCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from "../Controller/customerController.js";

const router = express.Router();
router.post("/",addCustomer);
router.get("/",getCustomers);
router.get("/:id",getCustomerById);
router.put("/:id",updateCustomer);
router.delete("/:id",deleteCustomer);
export default router;