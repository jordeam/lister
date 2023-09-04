import express from "express";
const router = express.Router();

// Require our controllers.
import supplierController from "../controllers/supplier.mjs";
import { ensureAuthenticated } from "../controllers/users.mjs";

/// PET ROUTES ///

// GET supplier list
router.get("/", supplierController.list);
router.post("/create", ensureAuthenticated, supplierController.create);
router.get("/:id", supplierController.home);
router.post("/:id", ensureAuthenticated, supplierController.update);
router.get("/:id/delete", ensureAuthenticated, supplierController.delete);

export default router;
