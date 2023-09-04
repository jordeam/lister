import express from "express";

const router = express.Router();

// Require our controllers.
import suppliercodeController from "../controllers/suppliercode.mjs";
import { ensureAuthenticated } from "../controllers/users.mjs";

/// PET ROUTES ///

// GET suppliercode list
// router.get("/", suppliercodeController.list);

// id is component id
router.post("/create/:id", ensureAuthenticated, suppliercodeController.create);

router.get("/:id", suppliercodeController.home);
router.post("/:id", ensureAuthenticated, suppliercodeController.update);
router.get("/:id/delete", ensureAuthenticated, suppliercodeController.delete);

export default router;
