import express from "express";
const router = express.Router();

// Require our controllers.
import supplierController from "../controllers/supplier.mjs";

/// PET ROUTES ///

// GET supplier list
router.get("/", supplierController.list);
router.post("/create", supplierController.create);
router.get("/:id", supplierController.home);
router.post("/:id", supplierController.update);
router.get("/:id/delete", supplierController.delete);

export default router;
