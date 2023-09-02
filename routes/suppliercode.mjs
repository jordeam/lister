import express from "express";

const router = express.Router();

// Require our controllers.
import suppliercodeController from "../controllers/suppliercode.mjs";

/// PET ROUTES ///

// GET suppliercode list
// router.get("/", suppliercodeController.list);

// id is component id
router.post("/create/:id", suppliercodeController.create);

router.get("/:id", suppliercodeController.home);
router.post("/:id", suppliercodeController.update);
router.get("/:id/delete", suppliercodeController.delete);

export default router;
